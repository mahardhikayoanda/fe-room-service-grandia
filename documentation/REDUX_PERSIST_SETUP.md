# Redux Persist Setup Guide

## 📦 Installation

```bash
pnpm add redux-persist
```

## ⚙️ Configuration

### 1. Store Configuration (`src/libs/store/store.ts`)

```typescript
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Use sessionStorage
const storage = createWebStorage("session");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Only persist cart state
};
```

### 2. Provider Setup (`src/libs/store/ReduxProvider.tsx`)

```typescript
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>
</Provider>
```

## 🎯 Storage Options

### sessionStorage (Current Setup) ✅

```typescript
createWebStorage("session");
```

- ✅ Data hilang saat close tab/browser
- ✅ Perfect untuk hotel/public device
- ✅ Lebih aman

### localStorage (Alternative)

```typescript
createWebStorage("local");
```

- Data persist forever (sampai di-clear manual)
- Bagus untuk personal device
- Perlu handle expiry manual

## 🔧 Advanced Configuration

### Set Expiry Time (Optional)

```typescript
import { createTransform } from "redux-persist";

// Transform to add timestamp
const expiryTransform = createTransform(
  // Transform state on save
  (inboundState: any) => ({
    ...inboundState,
    _persist_timestamp: Date.now(),
  }),
  // Transform state on rehydrate
  (outboundState: any) => {
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    if (now - outboundState._persist_timestamp > ONE_HOUR) {
      // Return empty state if expired
      return undefined;
    }

    return outboundState;
  },
  { whitelist: ["cart"] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  transforms: [expiryTransform],
};
```

### Migrate Data (Version Update)

```typescript
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  migrate: (state: any) => {
    // Migration logic here
    if (state._persist.version === 0) {
      // Transform old state to new state
      return Promise.resolve({
        ...state,
        // Add new fields or transform data
      });
    }
    return Promise.resolve(state);
  },
  whitelist: ["cart"],
};
```

## 🐛 Common Issues & Solutions

### Issue 1: Hydration Error in Next.js

**Solution:** Use noop storage for SSR

```typescript
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("session")
    : createNoopStorage();
```

### Issue 2: Middleware Warning

**Solution:** Ignore persist actions

```typescript
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    },
  }),
```

### Issue 3: Data Not Persisting

**Checklist:**

- ✅ Check browser support for sessionStorage
- ✅ Not in incognito/private mode
- ✅ Check browser console for errors
- ✅ Verify persistConfig.whitelist includes your reducer

## 🧹 Manual Clear Persist

```typescript
// In your component
import { persistor } from "@/libs/store/store";

// Purge all persisted state
persistor.purge();

// Or clear specific key
sessionStorage.removeItem("persist:root");
```

## 📊 Monitor Persist State

```typescript
// Check persisted state in DevTools
console.log(sessionStorage.getItem("persist:root"));

// Or in Redux DevTools
// Look for _persist key in state
```

## 🎨 Loading State (Optional)

```typescript
<PersistGate
  loading={<LoadingSpinner />}
  persistor={persistor}
>
  {children}
</PersistGate>
```

## 🔒 Security Considerations

- ✅ sessionStorage is same-origin only
- ✅ Data cleared on tab close
- ✅ Never store sensitive data (passwords, tokens)
- ✅ Always validate on backend
- ⚠️ Cart data should be validated on server

## 📚 Resources

- [Redux Persist Docs](https://github.com/rt2zz/redux-persist)
- [Next.js + Redux Persist](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)

# Next.js Page Transition Implementation Guide

## Kenapa Animasi Tidak Bekerja di Layout?

Di Next.js App Router, `layout.tsx` bersifat **persistent** dan **tidak re-render** saat navigasi antar halaman. Ini artinya:

- Layout hanya render sekali saat pertama load
- Saat navigasi ke halaman lain, layout tetap ada dan tidak di-unmount
- Component di dalam layout tidak di-reset
- Framer Motion tidak akan mendeteksi perubahan untuk trigger animasi

## Solusi: Gunakan Template.tsx ✅

Next.js menyediakan `template.tsx` yang memiliki behavior berbeda:

- **Template re-render** pada setiap navigasi
- Template di-unmount dan mount ulang saat pindah halaman
- Perfect untuk page transitions!

## Implementasi

### 1. Buat `app/template.tsx`

```tsx
"use client";

import PageTransition from "@/components/framer-motion/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition variant="slideRight" speed="fast">
      {children}
    </PageTransition>
  );
}
```

### 2. Layout.tsx tetap clean

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children} // Template akan wrap ini otomatis</Providers>
      </body>
    </html>
  );
}
```

## Perbedaan Layout vs Template

| Feature                 | Layout              | Template         |
| ----------------------- | ------------------- | ---------------- |
| Re-render saat navigasi | ❌ No               | ✅ Yes           |
| State preserved         | ✅ Yes              | ❌ No            |
| DOM element reused      | ✅ Yes              | ❌ No            |
| Good for                | Navigation, Headers | Page Transitions |

## Hierarchy Struktur

```
app/
├── layout.tsx          # Persistent wrapper (Navbar, Footer, Providers)
├── template.tsx        # Re-rendered on navigation (Page Transition)
└── page.tsx           # Konten halaman
```

Urutan rendering:

```
Layout (persistent)
  └── Template (re-rendered) ← Animasi terjadi di sini
      └── Page (konten berubah)
```

## Custom Transition per Route

Anda juga bisa membuat template khusus untuk route tertentu:

```
app/
├── template.tsx                    # Global transition
├── dashboard/
│   ├── template.tsx               # Dashboard specific transition
│   └── page.tsx
└── settings/
    ├── template.tsx               # Settings specific transition
    └── page.tsx
```

### Contoh: Dashboard dengan Fade

```tsx
// app/dashboard/template.tsx
"use client";

import PageTransition from "@/components/framer-motion/PageTransition";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition variant="fade" speed="fast">
      {children}
    </PageTransition>
  );
}
```

### Contoh: Settings dengan Slide Left

```tsx
// app/settings/template.tsx
"use client";

import PageTransition from "@/components/framer-motion/PageTransition";

export default function SettingsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition variant="slideLeft" speed="default">
      {children}
    </PageTransition>
  );
}
```

## Tips & Best Practices

### 1. Gunakan Template untuk Animasi

✅ **DO:**

```tsx
// app/template.tsx
<PageTransition>{children}</PageTransition>
```

❌ **DON'T:**

```tsx
// app/layout.tsx - Ini tidak akan bekerja!
<PageTransition>{children}</PageTransition>
```

### 2. Keep Layout untuk Persistent UI

```tsx
// app/layout.tsx
<>
  <Header /> // Tetap ada
  <Navbar /> // Tidak re-render
  {children} // Template + Page akan re-render
  <Footer /> // Tetap ada
</>
```

### 3. Pilih Speed yang Tepat

- **fast (0.2s)**: Untuk transisi yang responsif, cocok untuk mobile
- **default (0.3s)**: Balance antara smooth dan fast
- **slow (0.5s)**: Untuk efek dramatis
- **spring**: Untuk feel yang lebih natural

### 4. Pilih Variant Sesuai Context

- **fade**: Sederhana, cocok untuk content-heavy pages
- **slideRight**: Cocok untuk forward navigation (ke detail)
- **slideLeft**: Cocok untuk backward navigation (kembali)
- **slideUp**: Cocok untuk modal/dialog feel
- **scale**: Cocok untuk emphasis atau zoom effect

## Troubleshooting

### Animasi masih tidak jalan?

1. **Pastikan 'use client' ada di template.tsx**

   ```tsx
   "use client"; // Wajib ada di baris pertama!
   ```

2. **Check framer-motion terinstall**

   ```bash
   pnpm list framer-motion
   ```

3. **Pastikan tidak ada CSS override**

   ```css
   /* Hindari ini di global CSS */
   * {
     transition: none !important;
   }
   ```

4. **Check console untuk errors**
   Buka DevTools dan lihat ada error atau tidak

### Animasi terasa janky/lag?

1. Gunakan `speed="fast"` atau kurangi complexity
2. Hindari animasi yang terlalu complex di mobile
3. Gunakan `will-change` CSS untuk hint browser:
   ```tsx
   <PageTransition className="will-change-transform">
   ```

## Performance Considerations

- Template re-mount akan reset React state
- Gunakan Context/Redux untuk state yang perlu persist
- Untuk state sederhana, bisa simpan di localStorage
- Consider animation performance di low-end devices

## Summary

✅ Gunakan `template.tsx` untuk page transitions
✅ Gunakan `layout.tsx` untuk persistent UI
✅ Tambahkan `'use client'` di template
✅ Sesuaikan variant dan speed dengan UX yang diinginkan

# Page Transition Wrapper

Wrapper component untuk membuat transisi halaman menggunakan framer-motion.

## Komponen

### 1. PageTransition

Komponen dasar untuk animasi transisi halaman.

### 2. AnimatedPageWrapper

Wrapper dengan AnimatePresence bawaan untuk transisi yang lebih smooth.

## Cara Penggunaan

### Penggunaan Dasar

```tsx
import PageTransition from "@/components/framer-motion/PageTransition";

export default function MyPage() {
  return (
    <PageTransition>
      <div>
        <h1>Konten Halaman</h1>
        <p>Halaman ini akan muncul dengan animasi transisi</p>
      </div>
    </PageTransition>
  );
}
```

### Dengan AnimatedPageWrapper

```tsx
import { AnimatedPageWrapper } from "@/components/framer-motion/PageTransition";

export default function MyPage() {
  return (
    <AnimatedPageWrapper>
      <div>
        <h1>Konten Halaman</h1>
      </div>
    </AnimatedPageWrapper>
  );
}
```

### Dengan Variasi Animasi

```tsx
import PageTransition from '@/components/framer-motion/PageTransition';

// Fade animation
<PageTransition variant="fade">
  <YourContent />
</PageTransition>

// Slide from right
<PageTransition variant="slideRight">
  <YourContent />
</PageTransition>

// Slide from left
<PageTransition variant="slideLeft">
  <YourContent />
</PageTransition>

// Slide from bottom
<PageTransition variant="slideUp">
  <YourContent />
</PageTransition>

// Slide from top
<PageTransition variant="slideDown">
  <YourContent />
</PageTransition>

// Scale animation
<PageTransition variant="scale">
  <YourContent />
</PageTransition>
```

### Dengan Kecepatan Berbeda

```tsx
import PageTransition from '@/components/framer-motion/PageTransition';

// Fast transition (0.2s)
<PageTransition speed="fast">
  <YourContent />
</PageTransition>

// Default transition (0.3s)
<PageTransition speed="default">
  <YourContent />
</PageTransition>

// Slow transition (0.5s)
<PageTransition speed="slow">
  <YourContent />
</PageTransition>

// Spring animation
<PageTransition speed="spring">
  <YourContent />
</PageTransition>
```

### Kombinasi Variant dan Speed

```tsx
<PageTransition variant="slideRight" speed="fast">
  <YourContent />
</PageTransition>

<PageTransition variant="scale" speed="spring">
  <YourContent />
</PageTransition>
```

### Dengan Custom ClassName

```tsx
<PageTransition className="min-h-screen bg-gray-100">
  <YourContent />
</PageTransition>
```

## Props

### PageTransition Props

| Prop      | Type            | Default   | Description                    |
| --------- | --------------- | --------- | ------------------------------ |
| children  | ReactNode       | -         | Konten yang akan di-wrap       |
| className | string          | -         | Custom className untuk styling |
| variant   | TransitionType  | 'default' | Jenis animasi transisi         |
| speed     | TransitionSpeed | 'default' | Kecepatan animasi              |

### Transition Types

- `default`: Fade + slide up (opacity + y: 20)
- `fade`: Simple fade in/out
- `slideRight`: Slide from right to left
- `slideLeft`: Slide from left to right
- `slideUp`: Slide from bottom to top
- `slideDown`: Slide from top to bottom
- `scale`: Scale animation

### Transition Speeds

- `default`: 0.3 seconds
- `fast`: 0.2 seconds
- `slow`: 0.5 seconds
- `spring`: Spring physics animation

## Contoh Implementasi di Layout

```tsx
// app/layout.tsx
import { AnimatedPageWrapper } from "@/components/framer-motion/PageTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnimatedPageWrapper variant="default" speed="default">
          {children}
        </AnimatedPageWrapper>
      </body>
    </html>
  );
}
```

## Contoh Implementasi di Page

```tsx
// app/about/page.tsx
import PageTransition from "@/components/framer-motion/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition variant="slideRight" speed="fast">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4">Welcome to our about page!</p>
      </div>
    </PageTransition>
  );
}
```

## Tips

1. **AnimatePresence**: Gunakan `AnimatedPageWrapper` jika ingin exit animation bekerja dengan baik saat routing.

2. **Layout vs Page**: Letakkan di level page untuk transisi antar halaman, atau di layout untuk transisi global.

3. **Performance**: Gunakan `speed="fast"` untuk pengalaman yang lebih responsif.

4. **Mobile**: Pertimbangkan menggunakan animasi yang lebih ringan di mobile devices.

5. **Custom Variants**: Anda bisa membuat custom variants di file `PageTransitionVariants.ts` sesuai kebutuhan.

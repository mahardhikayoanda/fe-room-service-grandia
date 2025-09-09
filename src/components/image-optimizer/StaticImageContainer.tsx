// components/ImageContainer/StaticImage.tsx
import Image, { StaticImageData } from "next/image";
import React from "react";

type StaticImageProps = {
  src: StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  quality?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

export default function StaticImageContainer({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  quality = 75,
  objectFit = "cover",
}: StaticImageProps) {
  return (
    <div
      className={`relative ${fill ? "w-full h-full" : ""} ${className} overflow-hidden`}
    >
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder="blur" // StaticImage auto support blur
        sizes={fill ? "(max-width: 768px) 100vw, 80vw" : undefined}
        style={{ objectFit }}
      />
    </div>
  );
}

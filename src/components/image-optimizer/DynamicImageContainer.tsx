// components/ImageContainer/DynamicImage.tsx
import { imageBuffer } from "@/utils/imageBuffer";
import Image from "next/image";
import React from "react";

type DynamicImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  //   blurDataURL?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

export default async function DynamicImageContainer({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  quality = 75,
  placeholder = "empty",
  //   blurDataURL,
  objectFit = "cover",
}: DynamicImageProps) {
  const { base64, img } = await imageBuffer(src);

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
        sizes={fill ? "(max-width: 768px) 100vw, 80vw" : undefined}
        placeholder={placeholder}
        blurDataURL={placeholder === "blur" ? base64 : undefined}
        style={{ objectFit }}
      />
    </div>
  );
}

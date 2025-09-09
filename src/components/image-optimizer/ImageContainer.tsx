import { imageBuffer } from "@/utils/imageBuffer";
import Image, { StaticImageData } from "next/image";
import React from "react";
// TODO: perlu diperbaiki untuk blurDataURL, placeholder, dan loading

// NOTE: contoh penggunaan ImageContainer dengan source local/public folder
{
  /* <ImageContainer
  src={exampleImage}
  alt="Example Image"
  fill
  priority
  className="rounded-lg"
  placeholder="blur"
/> */
}

// NOTE: contoh penggunaan ImageContainer dengan source dari luar

type ImageContainerProps = {
  src: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

export default function ImageContainer({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  quality = 65,
  placeholder = "empty",
  blurDataURL,
  objectFit = "cover",
}: ImageContainerProps) {
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
        blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
        style={{
          objectFit,
        }}
      />
    </div>
  );
}

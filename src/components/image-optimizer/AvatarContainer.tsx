import Image, { StaticImageData } from "next/image";
import Avatar from "@mui/material/Avatar";
import { SxProps } from "@mui/material";

// NOTE: contoh penggunaan AvatarContainer dengan source local/public folder
{
  /* <AvatarContainer
  alt="Example Avatar"
  src={exampleAvatarImage}
  className="border-4 border-primary-600"
  placeholder="blur"
  width={76}
  height={76}
  sx={{
    width: {
      md: 58,
      lg: 68,
      xl: 76,
    },
    height: {
      md: 58,
      lg: 68,
      xl: 76,
    },
  }}
/>; */
}

type AvatarContainerProps = {
  alt: string;
  src: StaticImageData;
  width: number;
  height: number;
  sx?: SxProps;
  className?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  priority?: boolean;
};

export default function AvatarContainer({
  alt,
  src,
  width,
  height,
  sx,
  className,
  placeholder = "empty",
  blurDataURL,
  priority = false,
}: AvatarContainerProps) {
  return (
    <Avatar sx={sx} className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </Avatar>
  );
}

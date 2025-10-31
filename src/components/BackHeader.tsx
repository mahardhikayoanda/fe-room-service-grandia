import { Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

interface Props {
  title?: string;
}

export default function BackHeader({ title }: Props) {
  const route = useRouter();

  return (
    <div className="bg-white flex gap-1 items-center">
      <ArrowLeft
        size={24}
        className="text-primary cursor-pointer"
        onClick={() => route.back()}
      />
      <Typography
        variant="body1"
        sx={{
          fontWeight: "600",
          fontSize: "18px",
          color: "text.primary",
        }}
      >
        {title || "Unknown Title"}
      </Typography>
    </div>
  );
}

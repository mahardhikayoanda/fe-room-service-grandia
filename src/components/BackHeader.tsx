import { Typography } from "@mui/material";
import { ArrowLeft, Subtitles } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

interface Props {
  title?: string;
  subTitle?: string;
  withoutBackButton?: boolean;
}

export default function BackHeader({
  title,
  subTitle,
  withoutBackButton,
}: Props) {
  const route = useRouter();

  return (
    <div className="bg-white flex gap-1 items-center">
      {!withoutBackButton && (
        <ArrowLeft
          size={24}
          className="text-primary cursor-pointer"
          onClick={() => route.back()}
        />
      )}
      <div>
        <Typography
          variant="h1"
          sx={{
            fontWeight: "600",
            fontSize: "18px",
            color: "text.primary",
          }}
        >
          {title || "Unknown Title"}
        </Typography>
        {subTitle && (
          <Typography
            variant="body1"
            sx={{
              fontWeight: "400",
              fontSize: "14px",
              color: "text.primary",
            }}
          >
            {subTitle}
          </Typography>
        )}
      </div>
    </div>
  );
}

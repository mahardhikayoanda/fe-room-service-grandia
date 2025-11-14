"use client";

import { Box, Skeleton } from "@mui/material";

export default function ModifierItemSkeleton() {
  return (
    <div className="w-sm border bg-[#F2F2F2] pb-0 relative">
      {/* Header Skeleton */}
      <Box sx={{ position: "relative" }}>
        {/* Image Skeleton */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={250}
          sx={{ borderRadius: "0 0 16px 16px" }}
        />

        {/* Back Button Skeleton */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </Box>

        {/* Content Overlay Skeleton */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          }}
        >
          {/* Badge Skeleton */}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={120}
            height={24}
            sx={{ borderRadius: 1, mb: 1, bgcolor: "rgba(255,255,255,0.2)" }}
          />
          {/* Title Skeleton */}
          <Skeleton
            animation="wave"
            variant="text"
            width="80%"
            height={32}
            sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
          />
          {/* Description Skeleton */}
          <Skeleton
            animation="wave"
            variant="text"
            width="90%"
            height={20}
            sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width="60%"
            height={20}
            sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
          />
          {/* Price Skeleton */}
          <Skeleton
            animation="wave"
            variant="text"
            width={100}
            height={28}
            sx={{ bgcolor: "rgba(255,255,255,0.3)", mt: 1 }}
          />
        </Box>
      </Box>

      {/* Modifier Section Skeleton 1 */}
      <Box sx={{ bgcolor: "white", mt: 1, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Skeleton animation="wave" variant="text" width={150} height={24} />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={60}
            height={20}
            sx={{ borderRadius: 1 }}
          />
        </Box>
        {[1, 2].map((item) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
              p: 2,
              border: "1px solid #E5E7EB",
              borderRadius: 2,
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width={20}
              height={20}
            />
            <Skeleton animation="wave" variant="text" width="70%" height={20} />
          </Box>
        ))}
      </Box>

      {/* Modifier Section Skeleton 2 */}
      <Box sx={{ bgcolor: "white", mt: 1, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Skeleton animation="wave" variant="text" width={130} height={24} />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={70}
            height={20}
            sx={{ borderRadius: 1 }}
          />
        </Box>
        {[1, 2, 3].map((item) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
              p: 2,
              border: "1px solid #E5E7EB",
              borderRadius: 2,
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width={20}
              height={20}
            />
            <Skeleton animation="wave" variant="text" width="60%" height={20} />
          </Box>
        ))}
      </Box>

      {/* Notes Section Skeleton */}
      <Box sx={{ bgcolor: "white", mt: 1, p: 3 }}>
        <Skeleton
          animation="wave"
          variant="text"
          width={100}
          height={24}
          sx={{ mb: 2 }}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={100}
          sx={{ borderRadius: 2 }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="40%"
          height={16}
          sx={{ mt: 1 }}
        />
      </Box>

      {/* Bottom Button Skeleton */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "white",
          borderTop: "1px solid #E5E7EB",
          p: 3,
        }}
      >
        {/* Quantity Selector Skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton animation="wave" variant="text" width={80} height={24} />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Skeleton
              animation="wave"
              variant="circular"
              width={32}
              height={32}
            />
            <Skeleton animation="wave" variant="text" width={30} height={24} />
            <Skeleton
              animation="wave"
              variant="circular"
              width={32}
              height={32}
            />
          </Box>
        </Box>

        {/* Add to Cart Button Skeleton */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={48}
          sx={{ borderRadius: "99px" }}
        />
      </Box>
    </div>
  );
}

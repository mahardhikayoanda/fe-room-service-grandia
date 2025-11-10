"use client";

import { CategoryType } from "@/types/category.type";
import { Box, Card, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  categoryData?: CategoryType[];
  filterValue: string;
  onFilterValue: (filter: string) => void;
};

export default function FilterFoodBeverage({
  categoryData,
  filterValue,
  onFilterValue,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const categoryCount = categoryData?.length || 0;
  const isTwoCategories = categoryCount === 2;
  const isThreeCategories = categoryCount === 3;
  const isMoreThanThree = categoryCount > 3;

  const checkScrollPosition = () => {
    if (scrollContainerRef.current && isMoreThanThree) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [isMoreThanThree, categoryData]);

  const handleClick = (categoryUuid: string) => {
    // If clicking the same category, unselect it
    if (categoryUuid === filterValue) {
      onFilterValue("");
    } else {
      onFilterValue(categoryUuid);
    }
  };

  // Don't render if only 1 category
  if (categoryCount <= 1) {
    return null;
  }

  return (
    <Box sx={{ px: 3, pb: 2, background: "white", mb: 1 }}>
      <Typography
        variant="body1"
        sx={{
          mb: "12px",
          fontWeight: "700",
          fontSize: "16px",
          color: "text.primary",
        }}
      >
        Select Category
      </Typography>
      <Box sx={{ position: "relative" }}>
        {/* Left Arrow */}
        {isMoreThanThree && showLeftArrow && (
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: -12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              width: 32,
              height: 32,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        )}

        {/* Right Arrow */}
        {isMoreThanThree && showRightArrow && (
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: -12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              width: 32,
              height: 32,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        )}

        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: isMoreThanThree ? "flex-start" : "space-between",
            gap: 1,
            overflowX: isMoreThanThree ? "auto" : "visible",
            overflowY: "visible",
            // Hide scrollbar
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          {categoryData?.map((cat) => (
            <Card
              key={cat.uuid}
              elevation={0}
              onClick={() => handleClick(cat.uuid)}
              sx={{
                width: isMoreThanThree ? "120px" : "100%",
                flexShrink: isMoreThanThree ? 0 : 1,
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: 2,
                border: "2px solid",
                borderColor: filterValue === cat.uuid ? "#A67472" : "#E0E0E0",
                backgroundColor:
                  filterValue === cat.uuid ? "#A67472" : "#FFFFFF",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  transform: "translateY(-1px)",
                },
                ...(filterValue === cat.uuid && {
                  boxShadow: "0 8px 25px rgba(166,116,114,0.3)",
                }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isTwoCategories ? "row" : "column",
                  alignItems: isTwoCategories ? "center" : "stretch",
                }}
              >
                <Box
                  sx={{
                    width: isTwoCategories ? 60 : "100%",
                    height: isTwoCategories ? 60 : isThreeCategories ? 70 : 80,
                    position: "relative",
                    backgroundColor: "#f5f5f5",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={cat.photo.url || "/placeholder.svg"}
                    alt={cat.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box
                  sx={{
                    py: isTwoCategories ? 0.5 : 1,
                    px: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: isTwoCategories ? 1 : "none",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600",
                      color:
                        filterValue === cat.uuid ? "white" : "text.primary",
                      fontSize: isTwoCategories ? "14px" : "12px",
                      lineHeight: 1.2,
                    }}
                  >
                    {cat.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        filterValue === cat.uuid
                          ? "rgba(255,255,255,0.8)"
                          : "text.secondary",
                      fontSize: isTwoCategories ? "14px" : "12px",
                      mt: 0.5,
                    }}
                  >
                    {cat.product_count > 1
                      ? `${cat.product_count} items`
                      : `${cat.product_count} item`}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

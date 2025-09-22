import { menusDummyData } from "@/libs/data/menuDummyData";
import Image from "next/image";
import AddMenuButton from "./AddMenuButton";
import { Typography } from "@mui/material";
import { categoryMenus } from "./FilterFoodBeverage";

export default function MenuList({ filterValue }: { filterValue: string }) {
  // get categoryMenus from FilterFoodBeverage.tsx
  const selectedCategory = categoryMenus.find(
    (cat) => cat.name.toLowerCase() === filterValue.toLowerCase()
  );

  const filteredItems =
    filterValue === "Food"
      ? menusDummyData
      : menusDummyData.filter(
          (item) => item.category.toLowerCase() === filterValue.toLowerCase()
        );

  return (
    <div className="p-4">
      <div className="flex items-center gap-1">
        <Image
          src={selectedCategory?.image || "/images/f_and_b/food.png"}
          alt="Food & Beverage Banner"
          width={200}
          height={200}
          className="w-8 h-8 object-cover rounded-full"
        />
        <Typography
          sx={{
            fontWeight: "700",
            color: "#000000",
            fontSize: "16px",
          }}
        >
          {selectedCategory?.name} Menu
        </Typography>
        <Typography
          sx={{
            fontWeight: "700",
            color: "#000000",
            fontSize: "16px",
          }}
        >
          |
        </Typography>
        <Typography
          sx={{
            fontWeight: "400",
            color: "#4C4C4C",
            fontSize: "14px",
          }}
        >
          {" "}
          {filteredItems.length} items
        </Typography>
      </div>
      <div className="flex flex-col">
        {filteredItems.map((item, index) => (
          <div key={item.uuid} className="flex flex-col gap-0">
            <div className="flex flex-row-reverse justify-center gap-4 mt-4">
              <div className="w-[90px] h-[90px] relative">
                <Image
                  src={item.image.url}
                  alt={item.name}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>

              <div className="flex-1">
                <Typography
                  sx={{
                    fontWeight: "700",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    mt: "4px",
                    fontWeight: "400",
                    color: "#000000",
                    fontSize: "12px",
                  }}
                >
                  {item.description}
                </Typography>

                {item.best_seller && (
                  <div className="flex flex-row items-center gap-2 my-1">
                    <Image
                      src="/icons/BestSeller.svg"
                      alt="BestSeller"
                      width={16}
                      height={16}
                    />
                    <p className="text-[12px]">Best Seller</p>
                  </div>
                )}

                {item.recommended && (
                  <div className="flex flex-row items-center gap-2 my-1">
                    <Image
                      src="/icons/Recommended.svg"
                      alt="Recommended"
                      width={16}
                      height={16}
                    />
                    <p className="text-[12px]">Recommended</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center my-4">
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#000000",
                  fontSize: "16px",
                }}
              >
                {item.price}
              </Typography>

              <AddMenuButton />
            </div>

            {index !== filteredItems.length - 1 && (
              <hr className="mx-4 border-t border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { menusDummyData } from "@/libs/data/menuDummyData";
import Image from "next/image";
import AddMenuButton from "./AddMenuButton";

export default function MenuList({ filter }: { filter: string }) {
  const filteredItems =
    filter === "All"
      ? menusDummyData
      : menusDummyData.filter(
          (item) => item.category.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="flex flex-col">
      {filteredItems.map((item, index) => (
        <div key={item.uuid}>
          <div className="flex flex-row justify-center items-center px-4 gap-4 py-4">
            <div className="w-[152px] h-[152px] relative">
              <Image
                src={item.image.url}
                alt={item.name}
                fill
                className="object-contain rounded-xl"
              />
            </div>

            <div className="flex-1">
              <p className="font-bold">{item.name}</p>
              <p className="text-[16px]">{item.description}</p>

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

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row gap-1">
                  <div className="font-bold">RP</div> {item.price}
                </div>
                <AddMenuButton />
              </div>
            </div>
          </div>

          {index !== filteredItems.length - 1 && (
            <hr className="mx-4 border-t border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}

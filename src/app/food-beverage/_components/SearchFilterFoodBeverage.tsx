import Image from "next/image";
import Link from "next/link";

export default function SearchFilterFoodBeverage({ filter, setFilter }: any) {
  return (
    <section>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center">
        <div className="pb-4">
          <div className="w-[390px] h-[300px] rounded-b-4xl bg-white shadow-lg">
            {/* Title */}
            <div className="flex flex-row items-center gap-4 px-4 py-6">
              <Link href="/home-page">
                <Image
                  src="/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
              </Link>
              <div>
                <p className="font-bold">Food & Beverage</p>
                <p className="text-[12px]">Food & Beverage Delivery</p>
              </div>
            </div>

            <div className="flex flex-col bg-[#4F3534] text-white rounded-2xl px-4 py-4 mx-4 gap-2">
              <p>Delivery To Room 120</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/icons/Time.svg"
                  alt="Time"
                  width={16}
                  height={16}
                />
                <p>Estimated delivery: 30-60 mins</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center border rounded-2xl gap-2 px-2 m-4">
              <Image
                src="/icons/Search.svg"
                alt="Search"
                width={16}
                height={16}
              />
              <input type="text" placeholder="Search" className="w-full" />
            </div>

            <div className="flex flex-row justify-between items-center px-4 gap-1">
              {["All", "Food", "Drink", "Dessert"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex items-center justify-center w-[100px] rounded-2xl py-1 cursor-pointer ${
                    filter === cat
                      ? "bg-[#4F3534] text-white"
                      : "border border-[#4F3534] text-[#4F3534]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

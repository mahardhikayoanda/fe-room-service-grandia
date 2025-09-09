import Image from "next/image";

export default function ChartButton() {
  return (
    <section className="shadow-lg">
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center bg-[#4F3534] my-6 mx-4 p-4 rounded-2xl text-white">
            <div>
              <p>Your Cart</p>
              <p>3 items - Rp 55.000</p>
            </div>

            <div className="flex flex-row items-center gap-1 px-1 py-1 bg-black">
              <Image src="/icons/Cart.svg" alt="Cart" width={16} height={16} />
              <p>View Cart</p>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

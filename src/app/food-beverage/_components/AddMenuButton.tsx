"use client";

import { useState } from "react";

export default function AddMenuButton() {
  const [step, setStep] = useState("add");
  const [count, setCount] = useState(1);
  const [request, setRequest] = useState("");
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <>
      {step === "add" && (
        <button
          onClick={() => setIsRequestOpen(true)}
          className="px-4 py-1 border border-black rounded-full text-black font-bold cursor-pointer hover:bg-gray-100"
        >
          + Add
        </button>
      )}

      {step === "counter" && (
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() =>
              setCount((prev) => {
                if (prev - 1 <= 0) {
                  setStep("add");
                  return 0;
                }
                return prev - 1;
              })
            }
            className="w-6 h-6 flex items-center justify-center rounded-full border border-black text-black cursor-pointer"
          >
            -
          </button>

          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white font-bold text-sm">
            {count}
          </div>

          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="w-6 h-6 flex items-center justify-center rounded-full border border-black text-black cursor-pointer"
          >
            +
          </button>
        </div>
      )}

      {isRequestOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-[9999]"
          onClick={() => setIsRequestOpen(false)}
        >
          <div
            className="bg-white w-[390px] rounded-t-2xl p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold mb-2">Request</h3>
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Enter Request"
              className="w-full border border-gray-400 rounded-xl p-2 text-sm mb-4"
            />
            <button
              onClick={() => {
                setStep("counter");
                setCount(1);
                setIsRequestOpen(false);
              }}
              className="w-full bg-black text-white py-2 rounded-xl font-bold cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

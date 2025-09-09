"use client";

import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainerClient() {
  const ToastIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "info":
        return <Info />;
      case "error":
        return <CircleX />;
      case "success":
        return <CircleCheck />;
      case "warning":
        return <TriangleAlert />;
      default:
        return null;
    }
  };
  return (
    <ToastContainer
      pauseOnFocusLoss={false}
      position="top-right"
      autoClose={2500}
      icon={ToastIcon}
      theme="colored"
      hideProgressBar={false}
    />
  );
}

import { CircleAlert } from "lucide-react";
import { toast } from "react-toastify";

export const showNotificationToast = (message: string) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    style: {
      background: "#000",
      color: "#fff",
    },
    icon: <CircleAlert className="mt-0.5 mb-auto size-6 min-w-6 text-white" />,
  });
};

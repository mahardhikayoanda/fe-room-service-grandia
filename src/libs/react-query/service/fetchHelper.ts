/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next/client";

import { getQueryCLient } from "../providers";
import { apiVersion, baseURL, xClientVersion } from "@/constants";
import { getQRString } from "@/utils/geolocation";

interface ResponseWrapper<T> {
  data: T;
  success: boolean;
  message: string;
}

const fetchHelper = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: BodyInit | null | any,
  headers?: Record<string, string>
) => {
  try {
    const headerInit: Record<string, string> = headers || {};
    let body: BodyInit | null = null;

    if (data instanceof FormData) {
      body = data;
    } else {
      headerInit["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await axios.request({
      url: `${baseURL}${apiVersion}${url}`,
      method,
      data: body,
      headers: {
        Authorization: `Bearer ${getCookie("token") || ""}`,
        "x-client-version": xClientVersion,
        "room-qr-string": getQRString() || "",
        ...headerInit,
      },
    });

    return response.data;
  } catch (err: any) {
    const pathname = window?.location?.pathname;
    const queryClient = getQueryCLient();
    // log error to console
    console.error("Error in fetchHelper:", err);

    // Handle 401 Unauthorized error
    if (
      err.response.status === 401 &&
      url !== "/login" &&
      url !== "/register" &&
      url !== "/" &&
      url === "/profile/your-order/"
    ) {
      deleteCookie("token");
      window.location.href = `/login${pathname ? `?fallback=${pathname}` : ""}`;

      queryClient.cancelQueries();
    }
    throw err;
  }
};

export default fetchHelper;

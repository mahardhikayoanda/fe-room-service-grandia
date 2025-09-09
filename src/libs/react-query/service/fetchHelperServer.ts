import { apiVersion, baseURL, xClientVersion } from "@/constants";
import axios from "axios";

/**
 * Generic server-side data fetcher using axios
 * @param endpoint - path after apiVersion (e.g., "cms/voucher")
 * @returns parsed JSON response
 */

export async function fetchHelperServer<T = any>(endpoint: string): Promise<T> {
  try {
    const url = `${baseURL}${apiVersion}${endpoint}`;
    const res = await axios.get<T>(url, {
      headers: { "x-client-version": xClientVersion },
    });
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

import axios from "axios";
import { REPLIERS_API_KEY, REPLIERS_BASE_URL } from "../constants/constants";
import { GetListingsResponse } from "@/types/repliers";

// ----------------------------------------------------------------------

export const getListings = async (): Promise<GetListingsResponse> => {
  const res = await axios.get(
    `${REPLIERS_BASE_URL}/listings?balcony=&listings=true&operator=AND&sortBy=updatedOnDesc&status=A`,
    {
      headers: {
        "REPLIERS-API-KEY": REPLIERS_API_KEY,
        accept: "application/json",
        "content-type": "application/json",
      },
    }
  );
  return res.data;
};

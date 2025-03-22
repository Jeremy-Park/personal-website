import { DetailedListing, GetListingsResponse } from "@/types/repliers";
import axios from "axios";
import {
  REPLIERS_API_KEY,
  REPLIERS_BASE_URL,
  REPLIERS_CLIENT_ID,
} from "../constants/constants";

// ----------------------------------------------------------------------

export const getListing = async (mls: string): Promise<DetailedListing> => {
  const res = await axios.get(`${REPLIERS_BASE_URL}/listings/${mls}`, {
    headers: {
      "REPLIERS-API-KEY": REPLIERS_API_KEY,
      accept: "application/json",
      "content-type": "application/json",
    },
  });
  return res.data;
};

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

export const addFavorite = async (mls: string) => {
  const res = await axios.post(
    `${REPLIERS_BASE_URL}/favorites`,
    {
      clientId: REPLIERS_CLIENT_ID,
      mls,
    },
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

export const getFavorites = async () => {
  const res = await axios.get(`${REPLIERS_BASE_URL}/favorites`, {
    headers: {
      "REPLIERS-API-KEY": REPLIERS_API_KEY,
      accept: "application/json",
      "content-type": "application/json",
    },
  });
  return res.data;
};

"use client";
import { getListing, getListings } from "@/queries/repliers";
import { useQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

export const useListings = () => {
  return useQuery({
    queryFn: getListings,
    queryKey: ["useListings"],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useListing = (mls: string | undefined | null) => {
  return useQuery({
    queryFn: () => getListing(mls ?? ""),
    queryKey: ["useListing", mls],
    enabled: !!mls,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });
};

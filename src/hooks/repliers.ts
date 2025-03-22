"use client";
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/queries/repliers";

// ----------------------------------------------------------------------

export const useListings = () => {
  return useQuery({
    queryFn: getListings,
    queryKey: ["useListings"],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });
};

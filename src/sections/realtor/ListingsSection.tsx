"use client";
import LoadingSection from "@/components/LoadingSection";
import PageHeader from "@/components/PageHeader";
import { useListings } from "@/hooks/repliers";
import { Listing } from "@/types/repliers";
import { Grid2, Stack } from "@mui/material";
import ListingSummaryCard from "./ListingSummaryCard";

// ----------------------------------------------------------------------

const ListingsSection = () => {
  const listings = useListings();

  return (
    <Stack spacing={3}>
      {/* Header */}
      <PageHeader
        title="Listings"
        subheader={"Search for listings by price, location, and more"}
      />

      {/* Loading */}
      {!listings.data && <LoadingSection />}

      {/* Listings */}
      {listings.data && (
        <Grid2 container spacing={3}>
          {listings.data.listings.map((listing: Listing) => (
            <Grid2
              key={`listing-card-${listing.mlsNumber}`}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <ListingSummaryCard listing={listing} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Stack>
  );
};

export default ListingsSection;

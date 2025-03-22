"use client";
import Iconify from "@/components/Iconify";
import LoadingSection from "@/components/LoadingSection";
import { REPLIERS_CDN_BASE_URL } from "@/constants/constants";
import { fCurrency } from "@/constants/utils";
import { useListing } from "@/hooks/repliers";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  Stack,
} from "@mui/material";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

// ----------------------------------------------------------------------

const ListingSection = () => {
  const params = useParams();
  const mls = params.mls as string;

  const listing = useListing(mls);

  const handleStreetAddress = () => {
    return `${listing.data?.address?.streetNumber} ${listing.data?.address?.streetName}`;
  };

  const handleCityStateZip = () => {
    return `${listing.data?.address?.city}, ${listing.data?.address?.state} ${listing.data?.address?.zip}`;
  };

  const handleBedroomsText = () => {
    if (!listing.data) {
      return "";
    }

    // No numBedrooms
    if (
      listing.data.details?.numBedrooms === null ||
      listing.data.details?.numBedrooms === undefined
    ) {
      return "N/A";
    }

    // No numBedroomsPlus
    if (
      listing.data.details?.numBedroomsPlus === null ||
      listing.data.details?.numBedroomsPlus === undefined
    ) {
      return listing.data.details.numBedrooms;
    }

    // Has numBedroomsPlus
    return `${listing.data.details?.numBedrooms} + ${listing.data.details?.numBedroomsPlus}`;
  };

  const handleBathroomsText = () => {
    if (!listing.data) {
      return "";
    }

    // No numBathrooms
    if (
      listing.data.details?.numBathrooms === null ||
      listing.data.details?.numBathrooms === undefined
    ) {
      return "N/A";
    }

    // No numBathroomsPlus
    if (
      listing.data.details?.numBathroomsPlus === null ||
      listing.data.details?.numBathroomsPlus === undefined
    ) {
      return listing.data.details.numBathrooms;
    }

    // Has numBathroomsPlus
    return `${listing.data?.details?.numBathrooms} + ${listing.data?.details?.numBathroomsPlus}`;
  };

  const handleSqftText = () => {
    if (!listing.data) {
      return "";
    }

    if (
      listing.data.details?.sqft === null ||
      listing.data.details?.sqft === undefined
    ) {
      return "N/A";
    }

    return `${listing.data?.details?.sqft}`;
  };

  // Loading
  if (!listing.data) {
    return <LoadingSection />;
  }

  return (
    <Stack spacing={5}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        {/* Title */}
        <Typography variant="h5">{handleStreetAddress()}</Typography>

        {/* Actions */}
        <Stack alignItems="center" direction="row" spacing={2}>
          <Button startIcon={<Iconify icon="mdi:heart" />} variant="contained">
            Favorite
          </Button>
          <Button
            startIcon={<Iconify icon="mdi:directions" />}
            variant="contained"
          >
            Directions
          </Button>
          <Button startIcon={<Iconify icon="mdi:share" />} variant="contained">
            Share
          </Button>
        </Stack>
      </Stack>

      {/* Content */}
      {/* Images */}
      <Grid2 container spacing={1}>
        {listing.data.images?.slice(0, 4).map((image) => (
          <Grid2 size={{ xs: 6, lg: 3 }} key={`listing-image-${image}`}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${REPLIERS_CDN_BASE_URL}/${image}`}
                  alt="Listing"
                />
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Grid2 container spacing={3}>
        {/* Left column */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {/* Summary */}
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  {/* Price */}
                  <Typography sx={{ color: "primary.main" }} variant="h4">
                    {fCurrency(listing.data.listPrice)}
                  </Typography>

                  {/* Address */}
                  <Stack spacing={-1}>
                    <Typography variant="subtitle1">
                      {handleStreetAddress()}
                    </Typography>
                    <Typography variant="subtitle1">
                      {handleCityStateZip()}
                    </Typography>
                  </Stack>

                  {/* MLS number */}
                  <Typography color="text.secondary" variant="body2">
                    MLS#: {listing.data.mlsNumber}
                  </Typography>

                  {/* Features */}
                  <Stack
                    direction="row"
                    // divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    justifyContent="space-around"
                  >
                    {/* Bedrooms */}
                    <Stack alignItems="center">
                      <Stack direction="row" spacing={1}>
                        <Iconify color="text.secondary" icon="mdi:bed" />
                        <Typography color="text.secondary" variant="body2">
                          {handleBedroomsText()}
                        </Typography>
                      </Stack>
                      <Typography color="text.secondary" variant="caption">
                        Beds
                      </Typography>
                    </Stack>

                    {/* Bathrooms */}
                    <Stack alignItems="center">
                      <Stack direction="row" spacing={1}>
                        <Iconify color="text.secondary" icon="mdi:shower" />
                        <Typography color="text.secondary" variant="body2">
                          {handleBathroomsText()}
                        </Typography>
                      </Stack>
                      <Typography color="text.secondary" variant="caption">
                        Bathrooms
                      </Typography>
                    </Stack>

                    {/* Sqft */}
                    <Stack alignItems="center">
                      <Stack direction="row" spacing={1}>
                        <Iconify
                          color="text.secondary"
                          icon="mdi:home-outline"
                        />
                        <Typography color="text.secondary" variant="body2">
                          {handleSqftText()}
                        </Typography>
                      </Stack>
                      <Typography color="text.secondary" variant="caption">
                        Square Feet
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Listing details */}
            <Card>
              <CardContent>
                <pre>{JSON.stringify(listing.data, null, 2)}</pre>
              </CardContent>
            </Card>
          </Stack>
        </Grid2>

        {/* Right column */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Agent details */}
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Agent Details</Typography>

                  {listing.data.agents?.map((agent, index) => (
                    <Stack key={`agent-${index}`} direction="row" spacing={2}>
                      {agent.photo?.large && (
                        <img
                          src={`${REPLIERS_CDN_BASE_URL}/${agent.photo.large}`}
                          alt={agent.name || "Agent photo"}
                          width={80}
                          height={80}
                          style={{ borderRadius: "50%" }}
                        />
                      )}

                      <Stack spacing={1}>
                        <Typography variant="subtitle1">
                          {agent.name}
                        </Typography>

                        {agent.position && (
                          <Typography variant="body2" color="text.secondary">
                            {agent.position}
                          </Typography>
                        )}

                        {agent.phones?.map(
                          (phone: string, phoneIndex: number) => (
                            <Stack
                              key={`phone-${phoneIndex}`}
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Iconify
                                icon="mdi:phone"
                                sx={{ color: "text.secondary" }}
                              />
                              <Typography variant="body2">{phone}</Typography>
                            </Stack>
                          )
                        )}

                        {agent.email && (
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Iconify
                              icon="mdi:email"
                              sx={{ color: "text.secondary" }}
                            />
                            <Typography variant="body2">
                              {agent.email}
                            </Typography>
                          </Stack>
                        )}

                        {agent.website && (
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Iconify
                              icon="mdi:web"
                              sx={{ color: "text.secondary" }}
                            />
                            <Typography variant="body2">
                              {agent.website}
                            </Typography>
                          </Stack>
                        )}

                        {agent.brokerage?.name && (
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Iconify
                              icon="mdi:office-building"
                              sx={{ color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {agent.brokerage.name}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Brokerage details */}
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Brokerage Details</Typography>

                  {listing.data.office?.brokerageName && (
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Iconify
                          icon="mdi:office-building"
                          sx={{ color: "text.secondary" }}
                        />
                        <Typography variant="body1">
                          {listing.data.office.brokerageName}
                        </Typography>
                      </Stack>

                      {/* Display compensation if available */}
                      {listing.data.coopCompensation && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Iconify
                            icon="mdi:cash"
                            sx={{ color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Compensation: {listing.data.coopCompensation}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid2>
      </Grid2>

      <pre>{JSON.stringify(listing.data, null, 2)}</pre>
    </Stack>
  );
};

export default ListingSection;

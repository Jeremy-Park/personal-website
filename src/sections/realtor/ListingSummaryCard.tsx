import Iconify from "@/components/Iconify";
import { REPLIERS_CDN_BASE_URL } from "@/constants/constants";
import { fCurrency } from "@/constants/utils";
import { Listing } from "@/types/repliers";
import { fToNow } from "@/utils/formatTime";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  listing: Listing;
};

// ----------------------------------------------------------------------

const ListingSummaryCard = ({ listing }: Props) => {
  const handleAddressText = () => {
    return `${listing.address?.streetNumber} ${listing.address?.streetName}, ${listing.address?.city}, ${listing.address?.state} ${listing.address?.zip}`;
  };

  const handleBedroomsText = () => {
    // No numBedrooms
    if (
      listing.details?.numBedrooms === null ||
      listing.details?.numBedrooms === undefined
    ) {
      return "N/A";
    }

    // No numBedroomsPlus
    if (
      listing.details?.numBedroomsPlus === null ||
      listing.details?.numBedroomsPlus === undefined
    ) {
      return listing.details.numBedrooms;
    }

    // Has numBedroomsPlus
    return `${listing.details?.numBedrooms} + ${listing.details?.numBedroomsPlus}`;
  };

  const handleBathroomsText = () => {
    // No numBathrooms
    if (
      listing.details?.numBathrooms === null ||
      listing.details?.numBathrooms === undefined
    ) {
      return "N/A";
    }

    // No numBathroomsPlus
    if (
      listing.details?.numBathroomsPlus === null ||
      listing.details?.numBathroomsPlus === undefined
    ) {
      return listing.details.numBathrooms;
    }

    // Has numBathroomsPlus
    return `${listing.details?.numBathrooms} + ${listing.details?.numBathroomsPlus}`;
  };

  const handleSqftText = () => {
    if (listing.details?.sqft === null || listing.details?.sqft === undefined) {
      return "N/A";
    }

    return `${listing.details?.sqft}`;
  };

  const handleDateText = () => {
    if (listing.listDate === null || listing.listDate === undefined) {
      return "N/A";
    }

    // const date = new Date(listing.listDate);

    // return date.toLocaleDateString("en-US", {
    //   month: "long",
    //   day: "numeric",
    //   year: "numeric",
    // });

    return fToNow(listing.listDate);
  };

  return (
    <Card>
      {/* Image */}
      <CardMedia
        component="img"
        image={`${REPLIERS_CDN_BASE_URL}/${listing.images?.[0]}`}
      />

      <CardContent>
        <Stack spacing={3}>
          {/* Address and Price */}
          <Stack
            alignItems="start"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack>
              <Typography sx={{ color: "primary.main" }} variant="h5">
                {fCurrency(listing.listPrice)}
              </Typography>
              <Typography variant="body2">{handleAddressText()}</Typography>
            </Stack>

            <IconButton>
              <Iconify icon="mdi:heart" />
            </IconButton>
          </Stack>

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
                <Iconify color="text.secondary" icon="mdi:home-outline" />
                <Typography color="text.secondary" variant="body2">
                  {handleSqftText()}
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Square Feet
              </Typography>
            </Stack>
          </Stack>

          {/* Date Added */}
          <Typography color="text.secondary" variant="caption">
            {handleDateText()}
          </Typography>
        </Stack>

        {/* <Typography variant="body1">
          {JSON.stringify(listing, null, 2)}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default ListingSummaryCard;

"use client";
import Iconify from "@/components/Iconify";
import PageHeader from "@/components/PageHeader";
import { PATH_DASHBOARD } from "@/constants/paths";
import ListingSection from "@/sections/realtor/listing/ListingSection";
import { Container, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export default function ListingPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push(PATH_DASHBOARD.realtor);
  };

  return (
    <Container>
      <Stack py={5} spacing={5}>
        <PageHeader
          backButton={
            <IconButton onClick={handleBack} size="large">
              <Iconify icon="mdi:arrow-left" />
            </IconButton>
          }
          subheader="View listing details"
          title="Listing"
        />

        <ListingSection />
      </Stack>
    </Container>
  );
}

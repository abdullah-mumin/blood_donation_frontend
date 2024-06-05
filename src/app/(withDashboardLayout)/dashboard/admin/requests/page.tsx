"use client";

import BloodRequestTable from "@/components/table/BloodRequestTable";
import { useDonationRequestQuery } from "@/redux/features/user/requestApi";
import { Box, Stack, Typography } from "@mui/material";

const AllRequests = () => {
  const { data: allDonationRequest, isLoading } =
    useDonationRequestQuery(undefined);

  // console.log(allDonationRequest);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Stack>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h2" fontWeight={600}>
          All Blood Donation Request
        </Typography>
      </Box>
      <BloodRequestTable data={allDonationRequest?.data} loading={isLoading} />
    </Stack>
  );
};

export default AllRequests;

"use client";

import HistoryTable from "@/components/table/HistoryTable";
import { useDonationHistoryQuery } from "@/redux/features/user/requestApi";
import { Box, Stack, Typography } from "@mui/material";

const UserPage = () => {
  const { data: allDonationHistory, isLoading } =
    useDonationHistoryQuery(undefined);

  // console.log(allDonationHistory);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Stack>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h2" fontWeight={600}>
          All My Blood Donation History
        </Typography>
      </Box>
      <HistoryTable data={allDonationHistory?.data} loading={isLoading} />
    </Stack>
  );
};

export default UserPage;

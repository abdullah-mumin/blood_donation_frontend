"use client";

import MyRequestTable from "@/components/table/MyRequestTable";
import { useMyRequestQuery } from "@/redux/features/user/requestApi";
import { Box, Stack, Typography } from "@mui/material";

const MyRequestPage = () => {
  const { data: myRequest, isLoading } = useMyRequestQuery(undefined);

  // console.log(myRequest);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Stack>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h2" fontWeight={600}>
          All My Blood Request
        </Typography>
      </Box>
      <MyRequestTable data={myRequest?.data} loading={isLoading} />
    </Stack>
  );
};

export default MyRequestPage;

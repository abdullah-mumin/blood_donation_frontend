"use client";

import AdminTable from "@/components/table/AdminTable";
import { useAllUsersQuery } from "@/redux/features/user/donorAPI";
import { Box, Stack, Typography } from "@mui/material";

const ManageUsers = () => {
  const { data: allusers, isLoading, refetch } = useAllUsersQuery(undefined);

  // console.log(allusers);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Stack>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h2" fontWeight={600}>
          All Users
        </Typography>
      </Box>
      <AdminTable data={allusers?.data} loading={isLoading} refetch={refetch} />
    </Stack>
  );
};

export default ManageUsers;

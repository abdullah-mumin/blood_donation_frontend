"use client";

import assets from "@/assets";
import { setCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/user/profileApi";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/authServices";
import { BloodType } from "@/types";
import { convertToTitleCase } from "@/utils/convertTitle";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getBloodTypeLabel = (value: string) => {
  const bloodType = BloodType.find((type) => type.value === value);
  return bloodType ? bloodType.label : value;
};

const ProfilePage = () => {
  const [userRole, setUserRole] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setUserRole(user?.role?.toLowerCase());
    }
  }, [user]);

  // console.log(userRole);

  const { data, isLoading, refetch } = useGetProfileQuery(undefined);
  // console.log(data);
  const bloodTypeLabel = getBloodTypeLabel(data?.data?.bloodType || "");

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [refetch, user]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Stack>
      <Grid container spacing={4}>
        <Grid item md={6} sm={12} xs={12}>
          <Box
            sx={{
              // padding: "20px",
              display: "flex",
              justifyContent: "center",
              maxWidth: "auto",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#B9DCFF",
                borderRadius: "10px",
                display: "inline-block",
                padding: "10px",
              }}
            >
              <Image
                style={{ borderRadius: "10px" }}
                height={300}
                width={250}
                src={assets.images.person}
                alt="person"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "auto",
              mx: "auto",
            }}
          >
            <Box>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Name:</span>{" "}
                {data?.data?.name}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Email:</span>{" "}
                {data?.data?.email}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Blood Group:</span>{" "}
                {bloodTypeLabel}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Location:</span>{" "}
                {data?.data?.location}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Status:</span>{" "}
                {convertToTitleCase(data?.data?.status)}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Availability:</span>{" "}
                {data?.data?.availability === true
                  ? "Available"
                  : "Unavailable"}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Age:</span>{" "}
                {data?.data?.profile?.age !== null
                  ? data?.data?.profile?.age
                  : ""}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Bio:</span>{" "}
                {data?.data?.profile?.bio !== null
                  ? data?.data?.profile?.bio
                  : ""}
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500}>
                <span style={{ fontWeight: "600" }}>Last Donation Date:</span>{" "}
                {data?.data?.profile?.lastDonationDate !== null
                  ? data?.data?.profile?.lastDonationDate
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", my: 2, gap: "10px" }}>
        <Button
          sx={{ marginRight: "10px" }}
          component={Link}
          href={`/dashboard/${user?.role?.toLowerCase()}/profile/edit`}
        >
          Edit Profile
        </Button>
        <Button
          component={Link}
          href={`/dashboard/${user?.role?.toLowerCase()}/profile/change-password`}
        >
          Change Password
        </Button>
      </Box>
    </Stack>
  );
};

export default ProfilePage;

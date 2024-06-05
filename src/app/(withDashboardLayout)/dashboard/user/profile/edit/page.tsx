"use client";

import BHDatePicker from "@/components/Forms/BHDatePicker";
import BHForm from "@/components/Forms/BHForm";
import BHInput from "@/components/Forms/BHInput";
import BHSelect from "@/components/Forms/BHSelect";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/profileApi";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/authServices";
import { BloodType, UserAvailability, UserStatus } from "@/types";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const EditProfile = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setUserRole(user?.role?.toLowerCase());
    }
  }, [user]);

  const { data, isLoading } = useGetProfileQuery(undefined);
  const profileData = data?.data;
  // console.log(profileData);
  const [updateProfile] = useUpdateProfileMutation();
  // console.log(data);

  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date().toISOString())
  );

  const onsubmit = async (values: FieldValues): Promise<boolean> => {
    const toastId = toast.loading("Updating profile information...");
    // console.log(values);
    try {
      let success = true;
      const profileInfo = {
        age: values?.age,
        availability: values?.availability === "1" ? true : false,
        bio: values?.bio,
        lastDonationDate: dateFormatter(selectedDate),
        location: values?.location,
        name: values?.name,
        status: values?.status,
        bloodType: values?.bloodType,
      };
      // console.log(profileInfo);
      const res = await updateProfile(profileInfo).unwrap();
      // console.log(res);
      if (res?.statusCode === 200) {
        toast.success("Profile updated successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push(`/dashboard/${userRole}/profile`);
        success = true;
        return true;
      }

      return success;
    } catch (error) {
      if (typeof error === "object" && error !== null && "status" in error) {
        const { status } = error;
        if (status === 400) {
          const errorMessage = data.message;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        } else {
          toast.error(data?.message, {
            id: toastId,
            duration: 2000,
          });
        }
      } else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
      return false;
    }
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <Container>
      <Stack
        sx={{
          bgcolor: "#CFCFCE",
          padding: "20px",
          py: 5,
          borderRadius: "20px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Update your profile Info
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mx: "auto",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "600px" }}>
              <BHForm onSubmit={onsubmit}>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="name"
                    label="Name"
                    type="text"
                    size="small"
                    fullWidth={true}
                    value={profileData?.name}
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="location"
                    label="Location"
                    type="text"
                    size="small"
                    fullWidth={true}
                    value={profileData?.location}
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHSelect
                    items={BloodType}
                    name="bloodType"
                    label="Blood Group"
                    bloodValue={
                      profileData?.bloodType && profileData?.bloodType
                    }
                    fullWidth
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHSelect
                    items={UserAvailability}
                    name="availability"
                    label="Availability"
                    bloodValue={
                      profileData?.availability &&
                      profileData?.availability === true
                        ? "1"
                        : "2"
                    }
                    fullWidth
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHSelect
                    items={UserStatus}
                    name="status"
                    label="Status"
                    bloodValue={profileData?.status && profileData?.status}
                    fullWidth
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="age"
                    label="Age"
                    type="text"
                    size="small"
                    fullWidth={true}
                    value={profileData?.profile?.age}
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="bio"
                    label="Bio"
                    type="text"
                    size="small"
                    fullWidth={true}
                    value={profileData?.profile?.bio}
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <div style={{ width: "100%", textAlign: "start" }}>
                    Last Donation Date
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(selectedDate)}
                      onChange={(newValue) => setSelectedDate(dayjs(newValue))}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px", mt: 2 }}>
                  <Button
                    sx={{
                      margin: "10px 0px",
                    }}
                    fullWidth={true}
                    type="submit"
                  >
                    Update Profile
                  </Button>
                </Box>
              </BHForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default EditProfile;

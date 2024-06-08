"use client";

import BHForm from "@/components/Forms/BHForm";
import BHInput from "@/components/Forms/BHInput";
import { useUserPasswordChangeMutation } from "@/redux/features/user/profileApi";
import { useAppSelector } from "@/redux/hooks";
import { changePasswordSchema, validationChangePasswordSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ChangePassword = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setUserRole(user?.role?.toLowerCase());
    }
  }, [user]);

  const [userPasswordChange] = useUserPasswordChangeMutation();

  const onsubmit = async (values: FieldValues): Promise<boolean> => {
    if (values?.newPassword !== values?.confirmPassword) {
      toast.error(
        "New password and confirm password didn't match. Please try again!"
      );
      return false;
    }

    const toastId = toast.loading("Updating password...");
    try {
      const profileInfo = {
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword,
      };
      // console.log(profileInfo);
      const res = await userPasswordChange(profileInfo).unwrap();

      // console.log(res);
      if (res?.statusCode === 200) {
        toast.success("Password updated successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push(`/dashboard/${userRole}/profile`);
        return true;
      }
      return false;
    } catch (error: any) {
      // console.error(error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const { status, data } = error;
        if (status === 400) {
          const errorMessage = data?.errorDetails;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        } else {
          toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
      } else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
      return false;
    }
  };

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
            Update your password
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
              <BHForm
                onSubmit={onsubmit}
                resolver={zodResolver(validationChangePasswordSchema)}
                defaultValues={changePasswordSchema}
              >
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                    // value=""
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="newPassword"
                    label="New Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                    // value=""
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                    // value=""
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px", mt: 2 }}>
                  <Button
                    sx={{
                      margin: "10px 0px",
                    }}
                    fullWidth={true}
                    type="submit"
                  >
                    Change Password
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

export default ChangePassword;

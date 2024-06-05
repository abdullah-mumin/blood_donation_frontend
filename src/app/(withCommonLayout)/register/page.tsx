"use client";

import BHForm from "@/components/Forms/BHForm";
import BHInput from "@/components/Forms/BHInput";
import BHSelect from "@/components/Forms/BHSelect";
import { BloodType } from "@/types";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userRegistartion } from "@/services/actions/userRegistration";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/authServices";
import { useRouter } from "next/navigation";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";

const bloodTypeValues = BloodType.map((type) => type.value);

export const userValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  location: z.string().min(1, "Please enter your location."),
  bloodType: z
    .string()
    .refine(
      (val) => bloodTypeValues.includes(val),
      "Please enter a valid blood type."
    ),
  email: z.string().email("Please enter your valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password must be no more than 100 characters long."),
  isBloodDonate: z.boolean(),
});

export const defaultValues = {
  name: "",
  location: "",
  bloodType: "",
  email: "",
  password: "",
  isBloodDonate: false,
};

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [registration] = useRegisterMutation();
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const onsubmit = async (values: FieldValues): Promise<boolean> => {
    // console.log(values);
    try {
      let success = true;
      const userInfo = {
        name: values?.name,
        location: values?.location,
        bloodType: values?.bloodType,
        email: values?.email,
        password: values?.password,
        isBloodDonate: checked,
      };

      const res = await registration(userInfo).unwrap();
      // console.log(res);
      if (res?.statusCode === 201) {
        toast.success(res?.message);
        router.push("/login");
        // const result = await login({
        //   password: values.password,
        //   email: values.email,
        // }).unwrap();
        // if (result?.statusCode === 200) {
        //   const user = verifyToken(res.data.accessToken);
        //   dispatch(setUser({ user: user, token: res.data.accessToken }));
        //   router.push("/");
        //   return true;
        // }
        success = true;
        return success;
      }

      return success;
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  };
  return (
    <Container>
      <Stack sx={{ bgcolor: "#CFCFCE", padding: "20px", py: 15 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Registration with{" "}
            <Box component="span" color="primary.main">
              Blood
            </Box>{" "}
            Hero
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
                resolver={zodResolver(userValidationSchema)}
                defaultValues={defaultValues}
              >
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="name"
                    label="Name"
                    type="text"
                    size="small"
                    fullWidth={true}
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="location"
                    label="Location"
                    type="text"
                    size="small"
                    fullWidth={true}
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHSelect
                    items={BloodType}
                    name="bloodType"
                    label="Blood Group"
                    fullWidth
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="email"
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                  />
                </Box>
                <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                  />
                </Box>
                <Box
                  sx={{
                    pb: 1,
                    width: "100%",
                    maxWidth: "600px",
                    textAlign: "start",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={handleChange} />
                    }
                    label="I am willing to donate blood"
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
                    Registration
                  </Button>
                  <Typography component="p" fontWeight={300}>
                    Do you already have an account?{" "}
                    <Typography
                      sx={{ color: "primary.main" }}
                      component={Link}
                      href="/login"
                    >
                      Login
                    </Typography>
                  </Typography>
                </Box>
              </BHForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegistrationPage;

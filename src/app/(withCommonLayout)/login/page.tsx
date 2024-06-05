"use client";

import BHForm from "@/components/Forms/BHForm";
import BHInput from "@/components/Forms/BHInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { TUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/authServices";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationSchema = z.object({
  email: z.string().email("Please enter your valid email address."),
  password: z.string().min(6, "Password nust be at least 6 characters."),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onsubmit = async (values: FieldValues): Promise<boolean> => {
    const toastId = toast.loading("Logging in...");
    try {
      const email = values.email;
      const password = values.password;
      const userInfo = {
        email: email,
        password: password,
      };
      //   console.log(userInfo);
      const res = await login(userInfo).unwrap();
      // console.log(res);
      if (res.statusCode === 200) {
        const user = verifyToken(res.data.accessToken);
        dispatch(setUser({ user: user, token: res.data.accessToken }));
        toast.success("Login successful", { id: toastId, duration: 2000 });
        router.push(`/`);
        return true;
      }
      return false;
    } catch (error) {
      // console.log(error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const { status, data } = error;
        if (status === 400 && data && !data.success) {
          // Handle password validation error
          const errorMessage = data.errorDetails;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
          return false;
        } else {
          // Handle other 400 errors
          toast.error("Bad Request: Something went wrong!", {
            id: toastId,
            duration: 2000,
          });
          return false;
        }
      } else {
        // Handle other errors
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
      return false;
    }
  };

  return (
    <Container>
      <Stack sx={{ bgcolor: "#CFCFCE", padding: "20px", py: 15 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Login with{" "}
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
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  email: "",
                  password: "",
                }}
              >
                <Box sx={{ py: 2, width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="email"
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                  />
                </Box>
                <Box sx={{ width: "100%", maxWidth: "600px" }}>
                  <BHInput
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                  />
                </Box>
                <Box sx={{ width: "100%", maxWidth: "600px", mt: 2 }}>
                  <Button
                    sx={{
                      margin: "10px 0px",
                    }}
                    fullWidth={true}
                    type="submit"
                  >
                    Login
                  </Button>
                  <Typography component="p" fontWeight={300}>
                    Don&apos;t have an account?{" "}
                    <Typography
                      sx={{ color: "primary.main" }}
                      component={Link}
                      href="/register"
                    >
                      Create an account
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

export default LoginPage;

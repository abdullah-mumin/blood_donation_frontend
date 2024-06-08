"use client";

import assets from "@/assets";
import BHDatePicker from "@/components/Forms/BHDatePicker";
import BHForm from "@/components/Forms/BHForm";
import BHInput from "@/components/Forms/BHInput";
import { useSingleDonorQuery } from "@/redux/features/user/donorAPI";
import { useCreateDonorRequestMutation } from "@/redux/features/user/requestApi";
import { useAppSelector } from "@/redux/hooks";
import { getBloodTypeLabel } from "@/types";
import { convertToTitleCase } from "@/utils/convertTitle";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const DonorDetails = ({ params }: { params: { donorId: string } }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [reason, setReason] = useState<string>("");

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };
  const { donorId } = params;
  const options = {
    id: donorId,
  };

  const {
    data: singleDonor,
    isLoading,
    refetch,
  } = useSingleDonorQuery(options);

  //   console.log(singleDonor);

  const bloodTypeLabel = getBloodTypeLabel(singleDonor?.data?.bloodType || "");

  const [createDonorRequest] = useCreateDonorRequestMutation();

  const onsubmit = async (values: FieldValues): Promise<boolean> => {
    if (!user) {
      toast.error("You need to login first to send blood request");
      router.push("/login");
      return false;
    }
    const toastId = toast.loading("Sending Blood request ...");
    try {
      const data = {
        donorId: donorId,
        phoneNumber: values?.phoneNumber,
        dateOfDonation: dateFormatter(values.dateOfDonation),
        bloodType: singleDonor?.data?.bloodType,
        numberOfBag: values?.numberOfBag,
        reason: reason,
      };
      // console.log(data);
      const res = await createDonorRequest(data).unwrap();
      // console.log(res);
      if (res?.statusCode === 201) {
        toast.success("Blood request sent successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push("/donors");
        return true;
      }
      return false;
    } catch (error: any) {
      // console.error(error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const { status, data } = error;
        if (status === 400) {
          const errorMessage = data?.message;
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

  useEffect(() => {
    if (donorId) {
      refetch();
    }
  }, [donorId, refetch]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Container>
      <Stack sx={{ bgcolor: "#CFCFCE", padding: "20px", py: 5 }}>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            fontWeight={600}
          >
            Donor Details
          </Typography>
        </Box>
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
                  {singleDonor?.data?.name}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Email:</span>{" "}
                  {singleDonor?.data?.email}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Blood Group:</span>{" "}
                  {bloodTypeLabel}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Location:</span>{" "}
                  {singleDonor?.data?.location}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Status:</span>{" "}
                  {convertToTitleCase(singleDonor?.data?.status)}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Availability:</span>{" "}
                  {singleDonor?.data?.availability === true
                    ? "Available"
                    : "Unavailable"}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Age:</span>{" "}
                  {singleDonor?.data?.profile?.age !== null
                    ? singleDonor?.data?.profile?.age
                    : ""}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Bio:</span>{" "}
                  {singleDonor?.data?.profile?.bio !== null
                    ? singleDonor?.data?.profile?.bio
                    : ""}
                </Typography>
                <Typography variant="h6" component="h6" fontWeight={500}>
                  <span style={{ fontWeight: "600" }}>Last Donation Date:</span>{" "}
                  {singleDonor?.data?.profile?.lastDonationDate !== null
                    ? singleDonor?.data?.profile?.lastDonationDate
                    : ""}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Stack sx={{ my: 5 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="h1" fontWeight={600}>
              Contact with donor
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
                      name="phoneNumber"
                      label="Phone Number"
                      type="text"
                      size="small"
                      fullWidth={true}
                    />
                  </Box>
                  <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                    <BHInput
                      name="numberOfBag"
                      label="Number of Bag"
                      type="text"
                      size="small"
                      fullWidth={true}
                    />
                  </Box>
                  <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                    <BHDatePicker name="dateOfDonation" label="Donation Date" />
                  </Box>
                  <Box sx={{ pb: 1, width: "100%", maxWidth: "600px" }}>
                    <div style={{ width: "100%", textAlign: "start" }}>
                      <p>Message for Donor</p>
                    </div>
                    <TextField
                      id="filled-multiline-flexible"
                      placeholder="message"
                      multiline
                      rows={6}
                      variant="outlined"
                      fullWidth
                      value={reason}
                      onChange={handleReasonChange}
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
                      Blood Request
                    </Button>
                  </Box>
                </BHForm>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DonorDetails;

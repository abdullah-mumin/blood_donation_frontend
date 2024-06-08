"use client";

import BHDatePicker from "@/components/Forms/BHDatePicker";
import BHForm from "@/components/Forms/BHForm";
import BHInput from "@/components/Forms/BHInput";
import BHSelect from "@/components/Forms/BHSelect";
import { useCreateBloodRequestMutation } from "@/redux/features/user/requestApi";
import { BloodType } from "@/types";
import { dateFormatter } from "@/utils/dateFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const bloodTypeValues = BloodType.map((type) => type.value);

const BloodRequestPage = () => {
  const router = useRouter();
  const [reason, setReason] = useState<string>("");

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const [createBloodRequest] = useCreateBloodRequestMutation();

  const onsubmit = async (values: FieldValues): Promise<boolean> => {
    const toastId = toast.loading("Creating Blood request ...");
    try {
      const data = {
        phoneNumber: values?.phoneNumber,
        dateOfDonation: dateFormatter(values.dateOfDonation),
        bloodType: values?.bloodType,
        numberOfBag: values?.numberOfBag,
        reason: reason,
      };
      // console.log(data);
      const res = await createBloodRequest(data).unwrap();
      // console.log(res);
      if (res?.statusCode === 201) {
        toast.success("Blood request created successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push("/requests");
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

  return (
    <Container>
      <Stack sx={{ bgcolor: "#CFCFCE", padding: "20px", py: 15 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Blood Request
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
                  <BHSelect
                    items={BloodType}
                    name="bloodType"
                    label="Blood Group"
                    fullWidth
                  />
                </Box>
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
                    <p>Reason for Blood</p>
                  </div>
                  <TextField
                    id="filled-multiline-flexible"
                    placeholder="Why blood is need?"
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
    </Container>
  );
};

export default BloodRequestPage;

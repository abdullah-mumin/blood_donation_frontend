import { getBloodTypeLabel } from "@/app/(withDashboardLayout)/dashboard/user/profile/page";
import assets from "@/assets";
import { useAcceptBloodRequestMutation } from "@/redux/features/user/requestApi";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RequestCard = ({ data }: { data: any }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  // console.log(data);
  const [acceptBloodRequest] = useAcceptBloodRequestMutation();

  const handleAcceptBloodREquest = async (info: string) => {
    if (!user) {
      toast.error("You need to login first to accept blood request");
      router.push("/login");
      return;
    }
    const toastId = toast.loading("Accepting Blood request ...");
    try {
      const options = {
        id: info,
        data: {
          status: "APPROVED",
        },
      };
      // console.log(data);
      const res = await acceptBloodRequest(options).unwrap();
      // console.log(res);
      if (res?.statusCode === 200) {
        toast.success("Blood request accepted successfully", {
          id: toastId,
          duration: 2000,
        });
        router.refresh();
      }
    } catch (error: any) {
      // console.error(error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const { status, data } = error;
        if (status === 400) {
          const errorMessage = data?.message;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
        if (status === 403) {
          const errorMessage = data?.message;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        } else {
          toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
      } else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
    }
  };

  const bloodTypeLabel = getBloodTypeLabel(data?.bloodType || "");
  return (
    <Stack
      sx={{
        backgroundColor: "#B9DCFF",
        border: "1px solid lightgray",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ borderRadius: "10px" }}
          height={200}
          width={200}
          src={assets.images.person}
          alt="person"
        />
      </Box>
      <Box>
        <Typography variant="h6" component="h2" fontWeight={600}>
          Name: {data?.requester?.name}
        </Typography>
        <Typography>Blood Group: {bloodTypeLabel}</Typography>
        <Typography>Location: {data?.requester?.location}</Typography>
        <Typography>Number of Bags: {data?.numberOfBag}</Typography>
        <Typography>Contact Info: {data?.phoneNumber}</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Button
          onClick={() => handleAcceptBloodREquest(data?.id)}
          sx={{ width: "100%" }}
        >
          Accept Request
        </Button>
      </Box>
    </Stack>
  );
};

export default RequestCard;

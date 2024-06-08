import assets from "@/assets";
import { getBloodTypeLabel } from "@/types";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DonorCard = ({ data }: { data: any }) => {
  const router = useRouter();
  // console.log(data);

  const handleDonorDetails = async (info: string) => {
    // console.log(info);
    router.push(`/donors/${info}`);
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
          Name: {data?.name}
        </Typography>
        <Typography>Blood Group: {bloodTypeLabel}</Typography>
        <Typography>Location: {data?.location}</Typography>
        <Typography>
          Availability:{" "}
          {data?.availability === true ? "Available" : "Unavailable"}
        </Typography>
      </Box>
      <Box
        onClick={() => handleDonorDetails(data?.id)}
        sx={{
          display: "flex",
          justifyContent: "end",
          cursor: "pointer",
          ml: "auto",
        }}
      >
        <Image src={assets.images.arrow} alt="arrow" />
      </Box>
    </Stack>
  );
};

export default DonorCard;

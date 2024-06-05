import assets from "@/assets";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Stack sx={{ mt: 5 }}>
      <Grid sx={{ bgcolor: "#504F4E" }}>
        <Container>
          <Grid sx={{ my: 5 }} container spacing={2}>
            <Grid item md={1} sm={12} xs={12}></Grid>
            <Grid item md={5} sm={12} xs={12}>
              <Box>
                <Typography variant="h4" component="h2" fontWeight={600}>
                  <Box component="span" color="primary.main">
                    Blood
                  </Box>{" "}
                  Hero
                </Typography>
                <Typography sx={{ color: "#ffffff", width: "80%" }}>
                  Every donation counts. Give the gift of life and become a part
                  of something bigger.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2} sm={12} xs={12}></Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight={600}
                  color="#ffffff"
                >
                  Contact
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>
                  Email: abdullah.almumin26@gmail.com
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>
                  Number: 01637266341
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Image src={assets.images.facebook} alt="facebook" />
                  <Image src={assets.images.twitter} alt="twitter" />
                  <Image src={assets.images.youtube} alt="youtube" />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ border: "1px dashed #ffffff" }}></Box>
          <Stack py={5}>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12} xs={12}>
                <Typography color="#ffffff" component="p">
                  &copy; 2024 Blood Hero. All Rights Reserved.
                </Typography>
              </Grid>
              <Grid item md={6} sm={12} xs={12} textAlign="end">
                <Typography color="#ffffff" component="p">
                  Privacy Policy ! Terms & Conditions
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Grid>
    </Stack>
  );
};

export default Footer;

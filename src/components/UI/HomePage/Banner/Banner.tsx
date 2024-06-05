import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";

const Banner = () => {
  return (
    <Container sx={{ my: 10 }}>
      <Grid container spacing={2}>
        <Grid item md={7} sm={12} xs={12}>
          <Box
            sx={{
              py: "20px",
              height: "400px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", position: "absolute" }}>
              <Image src={assets.images.banner} alt="banner" />
            </Box>
            <Box sx={{ px: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight={600}
                sx={{ color: "#CFCFCE", position: "relative" }}
              >
                Save Lives,
              </Typography>
              <Typography
                variant="h4"
                component="h1"
                fontWeight={600}
                sx={{ color: "#CFCFCE", position: "relative" }}
              >
                Be a BloodHero!
              </Typography>
              <Typography
                variant="body2"
                component="h1"
                fontWeight={600}
                sx={{ color: "#CFCFCE", position: "relative", width: "70%" }}
              >
                Together, we save lives. Donate blood today and be a hero for
                someone in need.
              </Typography>

              <Button
                component={Link}
                href="/about"
                sx={{
                  mt: 2,
                  bgcolor: "#CFCFCE",
                  color: "#9D9C9A",
                  textTransform: "none",
                  fontWeight: "600",
                  "&:hover": {
                    bgcolor: "#CFCFCE",
                  },
                }}
              >
                About BloodHero
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Box sx={{ width: "100%", height: "400px" }}>
            <Image src={assets.images.bloodhand} alt="banner" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Banner;

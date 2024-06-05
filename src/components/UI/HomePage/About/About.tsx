import assets from "@/assets";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const AboutPage = () => {
  return (
    <Grid sx={{ bgcolor: "#CFCFCE", borderRadius: 3 }}>
      <Container sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            About Us
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item md={5} sm={12} xs={12}>
            <Box sx={{ width: "100%", height: "400px" }}>
              <Image src={assets.images.aboutUs} alt="about" />
            </Box>
          </Grid>
          <Grid item md={7} sm={12} xs={12}>
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                BloodHero is dedicated to saving lives through the power of
                blood donation. Our mission is to make it easy for you to make a
                difference. Join our community of heroes today!
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                fontWeight={600}
                sx={{ mb: 3 }}
              >
                Why Choose BloodHero?
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>1. Easy Donation Process:</strong> We simplify the blood
                donation process, from finding a donation center to tracking
                your donations.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>2. Community Support:</strong> Join a community of
                donors and volunteers committed to making a difference.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>3. Rewarding Experience:</strong> Earn rewards and
                recognition for your life-saving contributions.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>4. Trusted Network:</strong> Partnered with certified
                hospitals and clinics to ensure the safety and reliability of
                your donations.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>5. Awareness and Education:</strong> Learn about the
                importance of blood donation and how you can help save lives.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default AboutPage;

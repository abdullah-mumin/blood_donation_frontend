import assets from "@/assets";
import AboutPage from "@/components/UI/HomePage/About/About";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

const About = () => {
  return (
    <Stack>
      <AboutPage />
      <Grid sx={{ bgcolor: "#C9E4FF", borderRadius: 3 }}>
        <Container>
          <Box>
            <Box sx={{ textAlign: "center", my: 5 }}>
              <Typography variant="h4" component="h1" fontWeight={600}>
                Team Information
              </Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Grid container spacing={2}>
                <Grid item md={4} sm={12} xs={12}>
                  <Stack
                    sx={{
                      backgroundColor: "#B9DCFF",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      padding: "20px",
                      width: "300px",
                      display: "flex",
                      justifyContent: "center",
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
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" component="h2" fontWeight={600}>
                        Abdullah Al Mumin
                      </Typography>
                      <Typography>Co-Founder, CEO & CTO</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <Stack
                    sx={{
                      backgroundColor: "#B9DCFF",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      padding: "20px",
                      width: "300px",
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
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" component="h2" fontWeight={600}>
                        Monoar Al Mehedi
                      </Typography>
                      <Typography>Co-Founder & COO</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <Stack
                    sx={{
                      backgroundColor: "#B9DCFF",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      padding: "20px",
                      width: "300px",
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
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" component="h2" fontWeight={600}>
                        Pronoy Das
                      </Typography>
                      <Typography>Technal Lead</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Stack>
  );
};

export default About;

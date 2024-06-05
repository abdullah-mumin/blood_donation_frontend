import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const benefits = [
  "Free Health Check-up: Blood donors receive a mini-physical, which includes checking their pulse, blood pressure, body temperature, and hemoglobin levels.",
  "Reduces Iron Levels: Regular blood donation can help reduce iron overload in the blood, which can lower the risk of hemochromatosis.",
  "Improves Heart Health: Lower iron levels in the body are associated with a reduced risk of heart disease.",
];

const healthBenefits = [
  "Sense of Fulfillment: Donating blood can provide a sense of pride and satisfaction, knowing that you are helping to save lives.",
  "Community Engagement: Blood drives and donation events foster a sense of community and encourage people to come together for a common cause.",
  "Acts of Kindness: Donating blood is an act of altruism, which can improve mental well-being and reduce stress levels.",
];

const Benefit = () => {
  return (
    <Stack
      sx={{
        bgcolor: "#CFCFCE",
        padding: "20px",
        py: 5,
        mt: 5,
        borderRadius: "10px",
      }}
    >
      <Container>
        <Stack>
          <Box>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              fontWeight={600}
              my="10px"
            >
              Benefits for Donating Blood
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12} xs={12}>
                <Box>
                  <Typography variant="h6" component="h6" fontWeight={600}>
                    Health Benefits for the Donor
                  </Typography>
                  <List>
                    {benefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Box>
                  <Typography variant="h6" component="h6" fontWeight={600}>
                    Psychological and Social Benefits
                  </Typography>
                  <List>
                    {healthBenefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Benefit;

import assets from "@/assets";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Covarage = () => {
  return (
    <Stack>
      <Container>
        <Stack>
          <Box>
            <Typography
              variant="h4"
              component="h3"
              textAlign="center"
              fontWeight={600}
              my="20px"
            >
              Coverage Area
            </Typography>
          </Box>
          <Box>
            <Image
              height={1000}
              width={1000}
              src={assets.images.map}
              alt="coverage area"
            />
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Covarage;

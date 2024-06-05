"use client";

import DonorCard from "@/components/cards/DonorCard";
import { BloodType } from "@/types";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Key, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useGetAllDonorQuery } from "@/redux/features/user/donorAPI";
import { lime } from "@mui/material/colors";

const AvailabilityStatus = [
  {
    label: "Available",
    value: "1",
  },
  {
    label: "Unavailable",
    value: "2",
  },
];

const DonorsPage = () => {
  const [blood, setBlood] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  // console.log(page);

  const handleBloodChange = (event: SelectChangeEvent) => {
    setBlood(event.target.value as string);
  };

  const handleBloodClear = () => {
    setBlood("");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAvailability(event.target.value as string);
  };

  const handleClear = () => {
    setAvailability("");
  };

  const options = {
    bloodType: blood,
    location: name,
    available: availability,
    page: page,
    limit: 5,
  };

  // console.log(options);

  const { data: allDonors, isLoading, refetch } = useGetAllDonorQuery(options);
  // console.log(allDonors);

  useEffect(() => {
    if (blood || name || availability) {
      refetch();
    }
  }, [refetch, blood, name, availability]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Container>
      <Stack
        sx={{
          bgcolor: "#CFCFCE",
          padding: "20px",
          py: 5,
          borderRadius: "10px",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            fontWeight={600}
          >
            Search Blood Donors
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item md={4} sm={12} xs={12}>
                <Box>
                  <FormControl fullWidth>
                    <div style={{ width: "100%", textAlign: "start" }}>
                      Blood Group
                    </div>
                    <Select
                      value={blood}
                      onChange={handleBloodChange}
                      displayEmpty
                      size="small"
                      input={
                        <OutlinedInput
                          endAdornment={
                            blood && (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleBloodClear}
                                  edge="end"
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        />
                      }
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select Blood Group</em>;
                        }
                        return (
                          BloodType.find((item) => item.value === selected)
                            ?.label || ""
                        );
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Select Blood Group</em>
                      </MenuItem>
                      {BloodType.map((item) => (
                        <MenuItem key={item?.value} value={item?.value}>
                          <ListItemText
                            primary={item.label}
                            sx={{ textAlign: "start" }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <Box>
                  <FormControl fullWidth>
                    <div style={{ width: "100%", textAlign: "start" }}>
                      Availability
                    </div>
                    <Select
                      value={availability}
                      onChange={handleChange}
                      displayEmpty
                      size="small"
                      input={
                        <OutlinedInput
                          endAdornment={
                            availability && (
                              <InputAdornment position="end">
                                <IconButton onClick={handleClear} edge="end">
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        />
                      }
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select Availability</em>;
                        }
                        return (
                          AvailabilityStatus.find(
                            (item) => item.value === selected
                          )?.label || ""
                        );
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Select Availability</em>
                      </MenuItem>
                      {AvailabilityStatus.map((status) => (
                        <MenuItem key={status?.value} value={status?.value}>
                          <ListItemText
                            primary={status.label}
                            sx={{ textAlign: "start" }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <Box>
                  <div style={{ width: "100%", textAlign: "start" }}>
                    Donor Location
                  </div>
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-controlled"
                    variant="outlined"
                    placeholder="Location"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setName(event.target.value);
                    }}
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            sx={{ textAlign: "center", my: 5 }}
          >
            Total Donors found {allDonors?.meta?.total}
          </Typography>
          <Box>
            <Grid container spacing={4}>
              {allDonors && allDonors?.data?.length !== 0 ? (
                <>
                  {allDonors &&
                    allDonors?.data?.map(
                      (item: any, index: Key | null | undefined) => (
                        <Grid key={index} item md={4} sm={6} xs={12}>
                          <DonorCard data={item} />
                        </Grid>
                      )
                    )}
                </>
              ) : (
                <>
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={600}
                      sx={{ textAlign: "center", my: 5 }}
                    >
                      No donor found.
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Stack
            spacing={2}
            mt="20px"
            justifyContent="center"
            alignItems="center"
          >
            <Pagination
              count={allDonors && Math.ceil(allDonors?.meta?.total / 5)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default DonorsPage;

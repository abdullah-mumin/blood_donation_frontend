"use client";

import RequestCard from "@/components/cards/RequestCard";
import { useGetAllBloodRequestQuery } from "@/redux/features/user/requestApi";
import { BloodType } from "@/types";
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Key, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import ClearIcon from "@mui/icons-material/Clear";

const RequestsPage = () => {
  const [blood, setBlood] = useState<string>("");

  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const options = {
    bloodType: blood,
    page: page,
    limit: 5,
  };

  // console.log(options);
  const {
    data: allBloodRequest,
    isLoading,
    refetch,
  } = useGetAllBloodRequestQuery(options);

  // console.log(allBloodRequest);

  const handleChange = (event: SelectChangeEvent) => {
    setBlood(event.target.value as string);
  };

  const handleClear = () => {
    setBlood("");
  };

  useEffect(() => {
    if (blood) {
      refetch();
    }
  }, [refetch, blood]);

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
            All Blood Requests
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item md={4} sm={12} xs={12}></Grid>
              <Grid item md={4} sm={12} xs={12}>
                <Box>
                  <FormControl fullWidth>
                    <div style={{ width: "100%", textAlign: "start" }}>
                      Blood Group
                    </div>
                    <Select
                      value={blood}
                      onChange={handleChange}
                      displayEmpty
                      size="small"
                      input={
                        <OutlinedInput
                          endAdornment={
                            blood && (
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
              <Grid item md={4} sm={12} xs={12}></Grid>
            </Grid>
          </Box>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            sx={{ textAlign: "center", my: 5 }}
          >
            Total Requests found {allBloodRequest?.meta?.total}
          </Typography>
          <Box>
            <Grid container spacing={4}>
              {allBloodRequest && allBloodRequest?.data?.length !== 0 ? (
                <>
                  {allBloodRequest?.data &&
                    allBloodRequest?.data?.map(
                      (item: any, index: Key | null | undefined) => (
                        <Grid key={index} item md={4} sm={6} xs={12}>
                          <RequestCard data={item} />
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
                      No request found.
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
              count={
                allBloodRequest && Math.ceil(allBloodRequest?.meta?.total / 5)
              }
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

export default RequestsPage;

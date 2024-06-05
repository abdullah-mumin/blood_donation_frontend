import { baseApi } from "@/redux/api/baseApi";

const donorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDonor: builder.query({
      query: (options) => {
        // console.log(options);
        if (
          options?.bloodType &&
          options?.location &&
          options?.available &&
          options?.page &&
          options?.limit
        ) {
          return {
            url: `/donor-list?bloodType=${options?.bloodType}&searchTerm=${options?.location}&availability=${options?.available}&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        } else if (
          options?.bloodType &&
          options?.location &&
          options?.page &&
          options?.limit
        ) {
          return {
            url: `/donor-list?bloodType=${options?.bloodType}&searchTerm=${options?.location}&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        } else if (
          options?.bloodType &&
          options?.available &&
          options?.page &&
          options?.limit
        ) {
          return {
            url: `/donor-list?bloodType=${options?.bloodType}&availability=${options?.available}&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        } else if (
          options?.location &&
          options?.available &&
          options?.page &&
          options?.limit
        ) {
          return {
            url: `/donor-list?searchTerm=${options?.location}&availability=${options?.available}&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        } else if (options?.bloodType && options?.page && options?.limit) {
          return {
            url: `/donor-list?bloodType=${options?.bloodType}&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        } else if (options?.location && options?.page && options?.limit) {
          return {
            url: `/donor-list?searchTerm=${options?.location}&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        } else if (options?.available && options?.page && options?.limit) {
          //   console.log(options);
          return {
            url: `/donor-list?availability=${
              options?.available === "1" ? true : false
            }&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        }
        return {
          url: `donor-list?page=${options?.page}&limit=${options?.limit}`,
          method: "GET",
        };
      },
      providesTags: ["donor"],
    }),
    singleDonor: builder.query({
      query: (options) => {
        return {
          url: `/donor-info/${options?.id}`,
          method: "GET",
        };
      },
      providesTags: ["donor"],
    }),
    allUsers: builder.query({
      query: () => {
        return {
          url: `/users`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetAllDonorQuery, useSingleDonorQuery, useAllUsersQuery } =
  donorApi;

import { baseApi } from "@/redux/api/baseApi";

const requestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBloodRequest: builder.mutation({
      query: (data) => {
        return {
          url: "/donation-request/requester",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["request"],
    }),
    getAllBloodRequest: builder.query({
      query: (options) => {
        if (options?.bloodType && options?.page && options?.limit) {
          return {
            url: `/donation-request?bloodType=${options?.bloodType}&page=${options?.page}&limit=${options?.limit}`,
            method: "GET",
          };
        }
        return {
          url: `donation-request?page=${options?.page}&limit=${options?.limit}`,
          method: "GET",
        };
      },
      providesTags: ["request"],
    }),
    acceptBloodRequest: builder.mutation({
      query: (options) => {
        return {
          url: `/donation-request/${options?.id}`,
          method: "PATCH",
          body: options?.data,
        };
      },
      invalidatesTags: ["request"],
    }),
    createDonorRequest: builder.mutation({
      query: (data) => {
        return {
          url: "/donation-request/donor",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["request"],
    }),
    donationHistory: builder.query({
      query: () => {
        return {
          url: "/donation-request/history",
          method: "GET",
        };
      },
      providesTags: ["request"],
    }),
    donationRequest: builder.query({
      query: () => {
        return {
          url: "/donation-request/request",
          method: "GET",
        };
      },
      providesTags: ["request"],
    }),
    myRequest: builder.query({
      query: () => {
        return {
          url: "/donation-request/me",
          method: "GET",
        };
      },
      providesTags: ["request"],
    }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetAllBloodRequestQuery,
  useAcceptBloodRequestMutation,
  useCreateDonorRequestMutation,
  useDonationHistoryQuery,
  useDonationRequestQuery,
  useMyRequestQuery,
} = requestApi;

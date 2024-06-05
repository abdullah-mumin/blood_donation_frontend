import { baseApi } from "@/redux/api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        return {
          url: "/profile",
          method: "GET",
        };
      },
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `profile/update-profile`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["profile"],
    }),
    userPasswordChange: builder.mutation({
      query: (data) => {
        return {
          url: "/change-password",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUserPasswordChangeMutation,
} = profileApi;

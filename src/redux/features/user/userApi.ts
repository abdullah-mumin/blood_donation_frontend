import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserStatus: builder.mutation({
      query: (options) => {
        return {
          url: `/user-status/${options?.id}`,
          method: "PATCH",
          body: options?.data,
        };
      },
      invalidatesTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: (options) => {
        return {
          url: `/user-role/${options?.id}`,
          method: "PATCH",
          body: options?.data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUpdateUserStatusMutation, useUpdateUserRoleMutation } =
  userApi;

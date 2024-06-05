import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);

  if (result?.error?.status === 404) {
    const errorData = result;
    toast.error(errorData?.error?.data?.errorDetails);
  }

  if (result.error?.status === 401) {
    const res = await fetch(`http://localhost:5000/api/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data);

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data?.data.accessToken,
        })
      );
    } else {
      api.dispatch(logout());
    }
    result = await baseQuery(args, api, extraOptions);
  }
  // console.log(result);

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["profile", "request", "donor", "user"],
});

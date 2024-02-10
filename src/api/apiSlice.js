import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../redux/features/auth/authSlice";
import { BASE_URL } from "../../config";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // credentials: 'include',
  prepareHeaders(headers, { getState }) {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    if (!headers.get("file")) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.error("API Error:", result.error);
  }
  if (result?.error?.status === 401) {
    // Send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }, user));
      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut("final"));
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 180,
  endpoints: () => ({}),
});

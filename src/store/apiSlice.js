import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    // const authToken = getState()?.auth?.authToken;
    // const authToken = localStorage.getItem("authToken");
    // const apiKey = process.env.NEXT_PUBLIC_XAPIKEY;
    // if (authToken) {
    //   headers.set("Authorization", `Bearer ${authToken}`);
    // }
    return headers;
  },
});

/* eslint-disable consistent-return */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const { error } = result;
  if (error) {
    const { status, data } = error;

    if (status === 401) {
      // sessionStorage.clear();
      // localStorage.clear();
      // signOut({ redirect: false });
      // notification.error(
      //   data?.message || "Token expired! Please login again to continue"
      // );
    }

    // notification.error(data?.message || "Something went wrong");
    return;
  }

  return result;
};
/* eslint-enable consistent-return */

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [""],
  endpoints: () => ({}),
});
export default apiSlice;

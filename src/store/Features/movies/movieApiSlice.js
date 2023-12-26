import apiSlice from "../../apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.mutation({
      query: () => ({
        url: `/posts`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostMutation } = eventApiSlice;

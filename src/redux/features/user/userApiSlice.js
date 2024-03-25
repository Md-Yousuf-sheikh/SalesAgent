import { apiSlice } from "../../../api/apiSlice";

export const userApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["User"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMyInfo: builder.query({
        query: () => {
          return `agents/me`;
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
      agentDpUpload: builder.mutation({
        query: (body) => {
          return {
            url: "agents/change-profile-picture",
            method: "POST",
            body: body,
            headers: { file: true },
          };
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetMyInfoQuery,
  useLazyGetMyInfoQuery,
  useAgentDpUploadMutation,
} = userApiSlice;

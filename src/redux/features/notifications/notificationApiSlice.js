import { apiSlice } from "../../../api/apiSlice";

export const notificationApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["notifications"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUnreadNotificaitons: builder.query({
        query: ([userUid]) => {
          return {
            url: `agents/own/notifications/${userUid}/unread/count`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
      getAllNotifications: builder.query({
        query: ({ userUid, code }) => {
          return {
            url: `agents/own/notifications/${userUid}/all?lang=${code}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          // console.log("resOfCountNoti", response);
          return response?.data;
        },
      }),
      getLocationConfig: builder.query({
        query: () => {
          return {
            url: `agents/location/config`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
      redAllNotification: builder.query({
        query: (userId) => {
          console.log("userId", userId);
          return {
            url: `agents/own/notifications/${userId}/read`,
          };
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetUnreadNotificaitonsQuery,
  useGetAllNotificationsQuery,
  useGetLocationConfigQuery,
  useRedAllNotificationQuery,
} = notificationApiSlice;

import { apiSlice } from "../../../api/apiSlice";

export const customerApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Customer"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsersList: builder.query({
        query: (props) => {
          let uri = `agents/users/list`;
          if (props) {
            uri = `agents/users/list${props}`;
          }
          return {
            url: uri,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getAllCustomers: builder.query({
        query: (props) => {
          let uri = `agents/users`;
          if (props) {
            uri = `agents/users${props}`;
          }
          console.log("uri", uri);
          return {
            url: uri,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getAllFilterCustomers: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/users${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getAgentsTarget: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/target${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          // //console.log("responseOfTargetCard", response);
          return response;
        },
      }),
      getStatisticsData: builder.query({
        query: ([agentId, filter]) => {
          return {
            url: `agents/statistics?agent_id=${agentId}${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("resOfAgents", response);
          return response?.data;
        },
      }),
      getPerformanceAnalysisData: builder.query({
        query: (agentId) => {
          return {
            url: `agents/performance-analysis?agent_id=${agentId}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("performanceAnalysis", response);
          return response;
        },
      }),
      getAgentsWholeTarget: builder.query({
        query: () => {
          return {
            url: `agents/own/target`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          // //console.log("getAgentsWholeTarget", response);
          return response;
        },
      }),
      getCustomerManagementDatas: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/dashboard-cards${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getPaymentPending: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/payment-pending${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getWholePaymentPending: builder.query({
        query: () => {
          return {
            url: `agents/own/payment-pending`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getWholePremiumDues: builder.query({
        query: () => {
          return {
            url: `agents/own/premium-dues`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getCommissionBalance: builder.query({
        query: () => {
          return {
            url: `agents/own/balance-histories`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getFilteredCommissionBalance: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/balance-histories${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),

      getPremiumDues: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/premium-dues${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getWholePolicyRecommends: builder.query({
        query: () => {
          return {
            url: `agents/policy-recommends`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getFilterPolicyRecommends: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/policy-recommends${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response;
        },
      }),
      getActiveFieldForces: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/active-field-force${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response;
        },
      }),
      getWholeActiveFieldForces: builder.query({
        query: () => {
          return {
            url: `agents/own/active-field-force`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response;
        },
      }),
      getWholeAgentsLead: builder.query({
        query: () => {
          return {
            url: `agents/leads`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response?.data;
        },
      }),
      getFilterAgentsLead: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/leads${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response?.data;
        },
      }),
      getWholeInactiveCustomers: builder.query({
        query: () => {
          return {
            url: `agents/own/inactive-customers`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response?.data;
        },
      }),
      getFilterInactiveCustomers: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/inactive-customer${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response?.data;
        },
      }),
      getWholeRegularCustomers: builder.query({
        query: () => {
          return {
            url: `agents/own/regular-customers`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response?.data;
        },
      }),
      getWholeLeads: builder.query({
        query: () => {
          return {
            url: `agents/leads`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("resLeads", response);
          return response?.data;
        },
      }),
      getFilterLeads: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/leads${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("resLeads", response);
          return response?.data;
        },
      }),
      getFilterRegularCustomers: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/regular-customers${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("responsePremiumDues", response);
          return response?.data;
        },
      }),
      getExecutiveTrees: builder.query({
        query: () => {
          return {
            url: `agents/own/executive-trees`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("resOfExTrees", response);
          return response?.data;
        },
      }),
      getWholeExecutiveTrees: builder.query({
        query: ([filter]) => {
          return {
            url: `agents/own/executive-trees${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          //console.log("resOfExTrees", response);
          return response?.data;
        },
      }),

      addNewLeads: builder.mutation({
        query: (body) => {
          return {
            url: "agents/leads",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      submitLocation: builder.mutation({
        query: (body) => {
          return {
            url: "agents/location",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      sendPushNotifications: builder.mutation({
        query: (body) => {
          return {
            url: "agents/push-notifications",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      submitCustomerIdentity: builder.mutation({
        query: (body) => {
          return {
            url: "customers/get-identity",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      getLocation: builder.query({
        query: ([agentId, filter]) => {
          return {
            url: `agents/location/${agentId}${filter}`,
            headers: { Accept: "application/json" },
          };
        },
        transformResponse: (response) => {
          // //console.log("resOfLocation", response);
          return response?.data;
        },
      }),
      getWholeLocation: builder.query({
        query: ([agentId]) => {
          return {
            url: `agents/location/${agentId}?per_page=10`,
            headers: { Accept: "application/json" },
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
  useLazyGetAllCustomersQuery,
  useGetAllCustomersQuery,
  useGetAgentsTargetQuery,
  useLazyGetAgentsTargetQuery,
  useGetAgentsAchievedQuery,
  useGetAgentsWholeTargetQuery,
  useLazyGetAgentsWholeTargetQuery,
  useGetCustomerManagementDatasQuery,
  useLazyGetCustomerManagementDatasQuery,
  useGetPaymentPendingQuery,
  useLazyGetPaymentPendingQuery,
  useGetWholePaymentPendingQuery,
  useGetPremiumDuesQuery,
  useLazyGetPremiumDuesQuery,
  useGetWholePremiumDuesQuery,
  useLazyGetActiveFieldForcesQuery,
  useGetWholeActiveFieldForcesQuery,
  useGetWholeAgentsLeadQuery,
  useLazyGetFilterAgentsLeadQuery,
  useGetWholeInactiveCustomersQuery,
  useLazyGetFilterInactiveCustomersQuery,
  useGetWholePolicyRecommendsQuery,
  useLazyGetWholePolicyRecommendsQuery,
  useLazyGetFilterPolicyRecommendsQuery,
  useLazyGetAllFilterCustomersQuery,
  useGetWholeRegularCustomersQuery,
  useLazyGetFilterRegularCustomersQuery,
  useGetWholeLeadsQuery,
  useLazyGetWholeLeadsQuery,
  useLazyGetFilterLeadsQuery,
  useAddNewLeadsMutation,
  useGetExecutiveTreesQuery,
  useSubmitLocationMutation,
  useLazyGetLocationQuery,
  useGetLocationQuery,
  useLazyGetWholeLocationQuery,
  useLazyGetStatisticsDataQuery,
  useGetStatisticsDataQuery,
  useGetCommissionBalanceQuery,
  useLazyGetFilteredCommissionBalanceQuery,
  useSubmitCustomerIdentityMutation,
  useGetWholeExecutiveTreesQuery,
  useGetPerformanceAnalysisDataQuery,
  useSendPushNotificationsMutation,
  useGetUsersListQuery,
} = customerApiSlice;

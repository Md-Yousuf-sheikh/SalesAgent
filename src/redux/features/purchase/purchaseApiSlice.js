import { apiSlice } from "../../../api/apiSlice";

export const purchaseApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Purchase"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      purchaseFormSubmit: builder.mutation({
        query: (body) => {
          return {
            url: "orders/create",
            method: "POST",
            body: body,
            headers: { Accept: "application/json", file: true },
          };
        },
      }),
      submitCoupon: builder.mutation({
        query: (body) => {
          return {
            url: "check-coupon",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      submitReferral: builder.mutation({
        query: (body) => {
          return {
            url: "check-referral",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      sslPay: builder.mutation({
        query: (body) => {
          return {
            url: "pay",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      getPurchaseStatus: builder.query({
        query: ([status]) => {
          return `agents/own/policy-purchases?status=${status}`;
        },
        transformResponse: (response) => {
          console.log("resOfpolicyPurchase", response);
          return response?.data;
        },
      }),
      getFilterPurchaseStatus: builder.query({
        query: ([status, filter]) => {
          return `agents/own/policy-purchases?status=${status}${filter}`;
        },
        transformResponse: (response) => {
          // console.log("resOfpolicyPurchaseFilter", response);
          return response?.data;
        },
      }),
      getSalesCampaign: builder.query({
        query: () => {
          return `agents/campaigns`;
        },
        transformResponse: (response) => {
          // console.log("salesCampaign", response);s
          return response?.data;
        },
      }),
      getSalesCampaignBySlug: builder.query({
        query: ([slug]) => {
          return `agents/campaigns/${slug}`;
        },
        transformResponse: (response) => {
          // console.log("salesCampaignWithSLug", response);
          return response?.data;
        },
      }),
      getCampaignPolicy: builder.query({
        query: () => {
          return `agents/campaigns/policies`;
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
      getAddressByPostalCode: builder.query({
        query: ([postal_code]) => {
          return `address/${postal_code}`;
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
      getPoliciesBySlug: builder.query({
        query: ({ slug, code, add }) => `policies/${slug}/?lang=${code}${add}`,
      }),
    }),
    overrideExisting: true,
  });

export const {
  usePurchaseFormSubmitMutation,
  useSubmitCouponMutation,
  useSubmitReferralMutation,
  useSslPayMutation,
  useGetPurchaseStatusQuery,
  useLazyGetFilterPurchaseStatusQuery,
  useGetSalesCampaignQuery,
  useGetSalesCampaignBySlugQuery,
  useGetCampaignPolicyQuery,
  useLazyGetAddressByPostalCodeQuery,
  useGetPoliciesBySlugQuery,
} = purchaseApiSlice;

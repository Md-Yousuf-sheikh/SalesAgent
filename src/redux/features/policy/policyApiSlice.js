import { apiSlice } from "../../../api/apiSlice";

export const policyApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Policy"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllCategories: builder.query({
        query: (lang) => {
          return `categories/all?lang=${lang}`;
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
      getInsularList: builder.query({
        query: () => `users/supplier`,
      }),
      getPoliciesByCat: builder.query({
        query: ([catId, lang, props]) => {
          return `policies/${catId}/list?lang=${lang}${props}`;
        },
        transformResponse: (response) => {
          // console.log('responseOfCategoryPolicies', response)
          return response?.data;
        },
      }),
      getPoliciesByCategory: builder.query({
        query: ({ slug, code }) => {
          return `policies/${slug}/list?lang=${code}`;
        },
        transformResponse: (response) => {
          // console.log('responseOfCategoryPolicies', response)
          return response?.data;
        },
      }),
      getFormByCategory: builder.query({
        query: ([lang]) => {
          return `categories/form?lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('responseOfCategoryPolicies', response)
          return response?.data;
        },
      }),
      submitCategoryForm: builder.mutation({
        query: (body) => {
          return {
            url: "categories/form",
            method: "POST",
            body: body,
            headers: { Accept: "application/json", file: true },
          };
        },
      }),
      getPolicyPurchaseDetails: builder.query({
        query: ([uid]) => {
          return `policy-purchases/${uid}`;
        },
        transformResponse: (response) => {
          // console.log('responseOfCategoryPolicies', response)
          return response?.data;
        },
      }),

      getPoliciesByBusiness: builder.query({
        query: ([catId, policyFor, lang]) => {
          return `policies/${catId}/list?policy_for=${policyFor}&lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('responseOfCategoryPolicies', response)
          return response?.data;
        },
      }),
      getPoliciesByCatFilter: builder.query({
        query: ([catId, lang, filter]) => {
          return `policies/${catId}/list?lang=${lang}${filter}`;
        },
        transformResponse: (response) => {
          return response?.data;
        },
      }),
      getPoliciesListBySlug: builder.query({
        query: ({ slug, code, filter }) =>
          `policies/${slug}/list?lang=${code}&${filter}`,
      }),
      getPolicyBySlug: builder.query({
        query: ([slug, lang]) => {
          return `policies/${slug}?lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('responsePolicyBySlug', response)
          return response?.data;
        },
      }),
      getPurchaseFormsBypid: builder.query({
        query: ([slug, type, lang]) => {
          console.log("props", [slug, type, lang]);
          return `policies/${slug}/forms?type=${type}&lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('responsePolicyBySlug', response)
          return response?.data;
        },
      }),
      getFeaturePolicies: builder.query({
        query: ([lang]) => {
          // console.log('typePfPolll', type)
          return `feature-policies?type=B2C&lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('respoonseOfFeature', response, type)
          return response;
        },
      }),
      getFeaturePoliciesB2B: builder.query({
        query: ([lang]) => {
          // console.log('typePfPolll', type)
          return `feature-policies?type=B2B&lang${lang}`;
        },
        transformResponse: (response) => {
          // console.log('respoonseOfFeature', response, type)
          return response;
        },
      }),
      getAQuote: builder.mutation({
        query: (body) => {
          return {
            url: "quotations",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      getAllPolicies: builder.query({
        query: ([lang]) => {
          // console.log('typePfPolll', type)
          return `policies?policy_for=B2C&lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('resOfAllPolicy', response, type)
          return response?.data;
        },
      }),
      getQuoteForm: builder.query({
        query: ([type, lang]) => {
          // console.log('typePfPolll', type)
          return `quotations/forms?type=${type}&lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('resOfAllPolicy', response, type)
          return response?.data;
        },
      }),
      getAQuoteForm: builder.query({
        query: (code) => {
          return `quotations/forms?type=5&lang=${code}`;
        },
        transformResponse: (response) => {
          return response?.data?.Get_a_Quote;
        },
      }),
      postAQuote: builder.mutation({
        query: (body) => {
          return {
            url: "quotations",
            method: "POST",
            body: body,
          };
        },
      }),
      postIdentityType: builder.mutation({
        query: (data) => ({
          url: `customers/get-identity`,
          method: "POST",
          body: {
            user_id: data?.user_id,
            identity_type: data?.identity_type,
          },
        }),
      }),
      getPurchaseForm: builder.query({
        query: ({ slug, type, code }) =>
          `policies/${slug}/forms?type=${type}&lang=${code}`,
      }),
      recommendPolicy: builder.mutation({
        query: (body) => {
          return {
            url: "agents/policy-recommends",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      getFaq: builder.query({
        query: ([lang]) => {
          // console.log('typePfPolll', type)
          return `faqs?lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('resOfAllPolicy', response, type)
          return response?.data;
        },
      }),
      getCompanyDetails: builder.query({
        query: ([lang]) => {
          // console.log('typePfPolll', type)
          return `company?lang=${lang}`;
        },
        transformResponse: (response) => {
          // console.log('resOfAllPolicy', response, type)
          return response?.data;
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useGetPoliciesByCatQuery,
  useLazyGetPoliciesByCatQuery,
  useGetPolicyBySlugQuery,
  useLazyGetPolicyBySlugQuery,
  useGetPurchaseFormsBypidQuery,
  useLazyGetPurchaseFormsBypidQuery,
  useGetFeaturePoliciesQuery,
  useGetFeaturePoliciesB2BQuery,
  useLazyGetFeaturePoliciesQuery,
  useLazyGetFeaturePoliciesB2BQuery,
  useGetAQuoteMutation,
  useGetAllPoliciesQuery,
  useGetQuoteFormQuery,
  useRecommendPolicyMutation,
  useGetFaqQuery,
  useGetCompanyDetailsQuery,
  useLazyGetPoliciesByCatFilterQuery,
  useLazyGetPoliciesByBusinessQuery,
  useGetFormByCategoryQuery,
  useSubmitCategoryFormMutation,
  useGetPolicyPurchaseDetailsQuery,
  useGetAQuoteFormQuery,
  usePostAQuoteMutation,
  usePostIdentityTypeMutation,
  useGetPurchaseFormQuery,
  useGetPoliciesByCategoryQuery,
  useGetPoliciesListBySlugQuery,
  useGetInsularListQuery,
} = policyApiSlice;

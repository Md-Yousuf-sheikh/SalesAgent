import { apiSlice } from "../../../api/apiSlice";

export const premiumCalApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["PremiumCal"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      calculatePremium: builder.mutation({
        query: (body) => {
          return {
            url: "calculate-premium",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
    }),
    overrideExisting: true,
  });

export const { useCalculatePremiumMutation } = premiumCalApiSlice;

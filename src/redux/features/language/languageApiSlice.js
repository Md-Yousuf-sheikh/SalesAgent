import { apiSlice } from "../../../api/apiSlice";
// import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
// import { setTotalNotification } from './notificationSlice'

// export const languageAdapter = createEntityAdapter()
const initialState = {
  language: {
    code: "en",
    name: "English",
    status: "Active",
  },
  listOpen: false,
  inPress: null,
};
// export const selectLanguageSlice = apiSlice({
//     initialState,
//     reducers:{
//         selectLanguage:(state,action) =>{
//             state.language = action.payload
//         }
//     }
// })
export const languageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Language"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getLanguages: builder.query({
        query: () => {
          return `languages`;
        },
        transformResponse: (response) => {
          return response?.data?.filter((item) => item?.status === "active");
        },
      }),
      getLanguageTexts: builder.query({
        query: ([lang, platform]) => {
          return `translation/?lang=${lang}&platform=${platform}`;
        },
        //   providesTags:
        providesTags: (result, args, error) => {
          return [{ type: "Language", id: result?.id }];
        },
        transformResponse: (response) => {
          // console.log('responseOfEr', response)
          return response;
        },
      }),
      getTranslation: builder.mutation({
        query: ({ query }) => {
          return {
            url: `translation?${query}`,
            method: "GET",
          };
        },
        transformResponse: (res) => {
          return res?.data;
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetLanguagesQuery,
  useGetLanguageTextsQuery,
  useLazyGetLanguageTextsQuery,
  useGetTranslationMutation,
} = languageApiSlice;

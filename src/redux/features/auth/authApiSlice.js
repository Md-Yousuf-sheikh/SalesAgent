import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../../../api/apiSlice";
import { setCredentials, updateResetModal } from "./authSlice";

export const authApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Authentication"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signInEmail: builder.mutation({
        query: (inputs) => {
          return {
            url: `agents/auth/email-sign-in`,
            method: "POST",
            body: inputs,
          };
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              setCredentials({
                token: result?.data?.token,
                user: result?.data?.user,
              })
            );
            AsyncStorage.setItem("token", result?.data?.token);
            AsyncStorage.setItem("user", JSON.stringify(result?.data?.user));
            //  check and modal open or not
            if (!result?.data?.user?.fcm_token) {
              dispatch(updateResetModal(true));
            } else {
              dispatch(updateResetModal(false));
            }
          } catch (error) {}
        },
      }),
      fcmTokenUpdate: builder.mutation({
        query: (inputs) => {
          return {
            url: `auth/fcm-token-update`,
            method: "PATCH",
            body: inputs,
          };
        },
      }),
      signInNumber: builder.mutation({
        query: (inputs) => {
          return {
            url: `agents/auth/mobile-sign-in`,
            method: "PUT",
            body: inputs,
          };
        },
      }),

      forgotPassword: builder.mutation({
        query: (body) => {
          return {
            url: "auth/forgot-password",
            method: "PUT",
            body: body,
            headers: {
              Accept: "application/json",
            },
          };
        },
      }),
      verifyOTP: builder.mutation({
        query: (body) => {
          return {
            url: "agents/auth/verify-otp",
            method: "PUT",
            body: body,
          };
        },
        // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //   try {
        //     const result = await queryFulfilled;
        //     console.log("result_user_data_otp", JSON.stringify(result));
        //     dispatch(
        //       setCredentials({
        //         token: result?.data?.token,
        //         user: result?.data?.user,
        //       })
        //     );
        //     AsyncStorage.setItem("token", result?.data?.token);
        //     AsyncStorage.setItem("user", JSON.stringify(result?.data?.user));
        //     //  check and modal open or not
        //     if (!result?.data?.user?.fcm_token) {
        //       console.log("fcm_token_ssss", result?.data?.user?.fcm_token);
        //       dispatch(updateResetModal(true));
        //     } else {
        //       dispatch(updateResetModal(false));
        //       console.log(
        //         "fcm_token_ssss false",
        //         result?.data?.user?.fcm_token
        //       );
        //     }
        //   } catch (error) {}
        // },
      }),
      resetPassword: builder.mutation({
        query: (body) => {
          return {
            url: "auth/reset-password",
            method: "PUT",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      signOut: builder.mutation({
        query: () => {
          return {
            url: "auth/sign-out",
            method: "POST",
          };
        },
      }),
      changePassword: builder.mutation({
        query: (body) => {
          return {
            url: "auth/change-password",
            method: "PUT",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
      signUpCustomer: builder.mutation({
        query: (body) => {
          return {
            url: "auth/sign-up",
            method: "POST",
            body: body,
            headers: { Accept: "application/json" },
          };
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useChangePasswordMutation,
  useSignInEmailMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSignOutMutation,
  useGetCountriesQuery,
  useVerifyOTPMutation,
  useSignUpCustomerMutation,
  useSignInNumberMutation,
  useFcmTokenUpdateMutation,
} = authApiSlice;

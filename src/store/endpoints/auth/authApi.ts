import {
  LoginModelType,
  LoginResponseModel,
  MedataResponseModel,
  ResetPassModelType,
  VerifyOtpModel,
  verifyOtpResponseModel,
} from "@/types/auth/auth";
import Api_Endpoint from "../api_endpoints";
import { baseApi } from "../baseApi";
import { setMeData } from "../reducer/meDataReducer";
import { SuccessApiResponse } from "@/types/apps";
import { ChangePasswordModelType } from "@/types/apps/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseModel, LoginModelType>({
      query: ({ email, password }) => ({
        url: Api_Endpoint.loginApi,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["MeData"],
    }),
    meData: builder.query<MedataResponseModel, void>({
      query: () => {
        return {
          url: Api_Endpoint.meDataApi,
          method: "GET",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setMeData({ meData: data.data }));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["MeData"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: Api_Endpoint.logoutApi,
        method: "DELETE",
      }),
    }),
    forgotPass: builder.mutation<{ message: string }, { emailAddress: string }>(
      {
        query: ({ emailAddress }) => ({
          url: Api_Endpoint.forgotPassApi,
          method: "PUT",
          body: {
            emailAddress,
          },
        }),
      },
    ),
    verifyOTP: builder.mutation<verifyOtpResponseModel, VerifyOtpModel>({
      query: ({ emailAddress, otp }) => ({
        url: Api_Endpoint.verifyOtpApi,
        method: "PUT",
        body: {
          emailAddress,
          otp,
        },
      }),
    }),
    resetPass: builder.mutation<{ message: string }, ResetPassModelType>({
      query: (body) => ({
        url: Api_Endpoint.resetPassApi,
        method: "PUT",
        body,
      }),
    }),
    changePassword: builder.mutation<
      SuccessApiResponse,
      ChangePasswordModelType
    >({
      query: (body) => ({
        url: Api_Endpoint.changePassApi,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useMeDataQuery,
  useLogoutMutation,
  useForgotPassMutation,
  useVerifyOTPMutation,
  useResetPassMutation,
  useChangePasswordMutation,
} = authApi;

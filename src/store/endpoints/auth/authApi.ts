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

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseModel, LoginModelType>({
      query: ({ emailAddress, password }) => ({
        url: Api_Endpoint.loginApi,
        method: "POST",
        body: {
          emailAddress,
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
          dispatch(setMeData({ meData: data.data.user }));
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
      }
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
    resetPass: builder.mutation<{message:string},ResetPassModelType>({
      query:(body)=>({
        url: Api_Endpoint.resetPassApi,
        method:"PUT",
        body,
      })
    }),
    // changePass:builder.mutation<{}>()
  }),
});

export const {
  useLoginMutation,
  useMeDataQuery,
  useLogoutMutation,
  useForgotPassMutation,
  useVerifyOTPMutation,
  useResetPassMutation
} = authApi;

import {
  CreateDoctorPayload,
  DoctorApiResponseModel,
  DoctorDetailResponse,
  UpdateDoctorProfilePayload,
} from "@/types/apps/doctor";
import Api_Endpoint from "../api_endpoints";
import { baseApi } from "../baseApi";
import {
  CreateDoctorResponse,
  SuccessApiResponse,
  updateDoctorProfileResponse,
} from "@/types/apps";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation<CreateDoctorResponse, CreateDoctorPayload>({
      query: (body) => ({
        url: Api_Endpoint.createDoctorApi,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doctor"],
    }),
    getAllDoctor: builder.query<
      DoctorApiResponseModel,
      { page?: number; limit?: number; keyword?: string,subscriptionPlan?: string }
    >({
      query: ({ page, keyword, limit,subscriptionPlan }) => ({
        url: Api_Endpoint.doctorListingApi,
        params: {
          page,
          limit,
          keyword,
          subscriptionPlan
        },
      }),
      providesTags: ["Doctor"],
    }),
    doctorDetailById: builder.query<DoctorDetailResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.doctorDetailAPi}/${id}`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    updateProfile: builder.mutation<
      updateDoctorProfileResponse,
      { id: string; body: UpdateDoctorProfilePayload }
    >({
      query: ({ id, body }) => ({
        url: `/admin/doctors/${id}/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Doctor"],
    }),
    removeMultipleImage: builder.mutation<SuccessApiResponse, { id: string,mediaId:string }>({
      query: ({ id ,mediaId}) => ({
        url: `/admin/doctors/${id}/media/${mediaId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),
    deleteDoctor: builder.mutation<SuccessApiResponse,{doctorId:string}>({
      query: ({doctorId}) =>({
        url: `${Api_Endpoint.deleteDoctorApi}/${doctorId}`,
        method:"DELETE"
      }),
      invalidatesTags:["Doctor"]
    }),
    resendPaymentLink: builder.mutation<SuccessApiResponse,{id:string}>({
      query: ({id})=>({
        url: `/admin/doctors/${id}/resend-payment-link`,
        method: "POST"
      })
    })
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorQuery,
  useDoctorDetailByIdQuery,
  useUpdateProfileMutation,
  useRemoveMultipleImageMutation,
  useDeleteDoctorMutation,
  useResendPaymentLinkMutation
} = doctorApi;

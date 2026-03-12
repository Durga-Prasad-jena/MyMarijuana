import {
  CreateDoctorPayload,
  DoctorApiResponseModel,
  DoctorDetailResponse,
} from "@/types/apps/doctor";
import Api_Endpoint from "../api_endpoints";
import { baseApi } from "../baseApi";
import { SuccessApiResponse } from "@/types/apps";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation<
      { avatar: string; message: string },
      CreateDoctorPayload
    >({
      query: (body) => ({
        url: Api_Endpoint.createDoctorApi,
        method: "POST",
        body,
      }),
    }),
    getAllDoctor: builder.query<
      DoctorApiResponseModel,
      { page?: number; limit?: number; keyword?: string }
    >({
      query: ({ page, keyword, limit }) => ({
        url: Api_Endpoint.doctorListingApi,
        params: {
          page,
          limit,
          keyword,
        },
      }),
    }),
    doctorDetailById: builder.query<DoctorDetailResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.doctorDetailAPi}/${id}`,
        method: "GET",
      }),
    }),
    avatarUpload: builder.mutation({
      query: ({ URL, file }) => ({
        url: URL,
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "image/jpeg",
        },
      }),
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorQuery,
  useDoctorDetailByIdQuery,
  useAvatarUploadMutation,
} = doctorApi;

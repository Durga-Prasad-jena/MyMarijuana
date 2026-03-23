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
    createDoctor: builder.mutation<SuccessApiResponse, CreateDoctorPayload>({
      query: (body) => ({
        url: Api_Endpoint.createDoctorApi,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doctor"],
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
      providesTags: ["Doctor"],
    }),
    doctorDetailById: builder.query<DoctorDetailResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.doctorDetailAPi}/${id}`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorQuery,
  useDoctorDetailByIdQuery,
} = doctorApi;

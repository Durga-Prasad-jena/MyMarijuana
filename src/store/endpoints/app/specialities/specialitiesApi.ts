import { SearchKeywordModel, SuccessApiResponse } from "@/types/apps";
import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import { DetailSpecialtyResponse, SpecialtyResponse } from "@/types/apps/specialities";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    specialties: builder.query<SpecialtyResponse, SearchKeywordModel>({
      query: ({ limit, page, keyword }) => ({
        url: Api_Endpoint.getAllSpecialtiesApi,
        params: {
          page,
          limit,
          keyword,
        },
      }),
      providesTags: ["Specialty"],
    }),

    createSpecialties: builder.mutation<SuccessApiResponse, { name: string }>({
      query: ({name}) => ({
        url: Api_Endpoint.createSpecialtiesApi,
        method: "POST",
        body:{
          name
        }
      }),
      invalidatesTags: ["Specialty"],
    }),
    updateSpecialties: builder.mutation<
      SuccessApiResponse,
      { name: string; id: string }
    >({
      query: ({ name, id }) => ({
        url: `${Api_Endpoint.updateSpecialtiesApi}/${id}`,
        method: "PUT",
        body: {
          name,
        },
      }),
      invalidatesTags: ["Specialty"],
    }),
    deleteSpecialties: builder.mutation<SuccessApiResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.deleteSpecialtiesApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Specialty"],
    }),
    detailSpecialties: builder.query<DetailSpecialtyResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.specialtiesDetailApi}/${id}`,
        method: "GET",
      }),
      providesTags: ["Specialty"],
    }),
  }),
});

export const {
  useSpecialtiesQuery,
  useCreateSpecialtiesMutation,
  useDeleteSpecialtiesMutation,
  useDetailSpecialtiesQuery,
  useUpdateSpecialtiesMutation,
} = specialtiesApi;

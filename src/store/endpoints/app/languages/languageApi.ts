import { SearchKeywordModel, SuccessApiResponse } from "@/types/apps";
import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import { LanguageResponse } from "@/types/apps/langauge";
import { DetailSpecialtyResponse } from "@/types/apps/specialities";

const languageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    languagesData: builder.query<LanguageResponse, SearchKeywordModel>({
      query: ({ limit, page, keyword }) => ({
        url: Api_Endpoint.getAllLanguagesApi,
        params: {
          page,
          keyword,
          limit,
        },
      }),
      providesTags: ["Languages"],
    }),
    createLanguages: builder.mutation<SuccessApiResponse, { name: string }>({
      query: ({ name }) => ({
        url: Api_Endpoint.createLanguagesApi,
        method: "POST",
        body: {
          name,
        },
      }),
      invalidatesTags: ["Languages"],
    }),
    updateLanguages: builder.mutation<
      SuccessApiResponse,
      { name: string; id: string }
    >({
      query: ({ name, id }) => ({
        url: `${Api_Endpoint.updateLanguagesApi}/${id}`,
        method: "PUT",
        body: {
          name,
        },
      }),
      invalidatesTags: ["Languages"],
    }),
    deleteLanguages: builder.mutation<SuccessApiResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.deleteLanguagesApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Languages"],
    }),
    detailsLanguages: builder.query<DetailSpecialtyResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.languagesDetailApi}/${id}`,
        method: "GET",
      }),
      providesTags: ["Languages"],
    }),
  }),
});

export const {
  useLanguagesDataQuery,
  useCreateLanguagesMutation,
  useDeleteLanguagesMutation,
  useDetailsLanguagesQuery,
  useUpdateLanguagesMutation,
} = languageApi;

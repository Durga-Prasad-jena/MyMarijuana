import { SearchKeywordModel, SuccessApiResponse } from "@/types/apps";
import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import {
  CreateFaqPayloadModel,
  FaqDetailResponseModel,
  FaqResponseModel,
} from "@/types/apps/faq";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allFaq: builder.query<FaqResponseModel, SearchKeywordModel>({
      query: (params) => ({
        url: Api_Endpoint.getAllFaqApi,
        params,
      }),
      providesTags: ["Faq"],
    }),
    createFaq: builder.mutation<SuccessApiResponse, CreateFaqPayloadModel>({
      query: (body) => ({
        url: Api_Endpoint.createFaqApi,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation<SuccessApiResponse, { id: string }>({
      query: ({id}) => ({
        url: `${Api_Endpoint.deleteFaqApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
    updateFaq: builder.mutation<
      SuccessApiResponse,
      { id: string; body: CreateFaqPayloadModel }
    >({
      query: ({ id, body }) => ({
        url: `${Api_Endpoint.updateFaqApi}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Faq"],
    }),
    detailFaq: builder.query<FaqDetailResponseModel, { id: string }>({
      query: ({id}) => ({
        url: `${Api_Endpoint.faqDetailApi}/${id}`,
      }),
      providesTags: ["Faq"],
    }),
  }),
});

export const {
  useAllFaqQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useDetailFaqQuery,
  useUpdateFaqMutation,
} = faqApi;

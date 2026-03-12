import { SuccessApiResponse } from "@/types/apps";
import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import { LanguageResponse } from "@/types/apps/langauge";

const languageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     languagesData: builder.query<LanguageResponse,void>({
      query: () => ({
        url: Api_Endpoint.getAllLanguagesApi,
      }),
    }),
  }),
});

export const { useLanguagesDataQuery } = languageApi;
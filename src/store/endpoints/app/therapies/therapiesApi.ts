import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import { TherapiesResponse } from "@/types/apps/therapies";

const therapiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     therapies: builder.query<TherapiesResponse,void>({
      query: () => ({
        url: Api_Endpoint.getAllTherapiesApi,
      }),
    }),
  }),
});

export const { useTherapiesQuery} = therapiesApi;

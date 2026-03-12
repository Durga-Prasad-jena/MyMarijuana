import { SuccessApiResponse } from "@/types/apps";
import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import { SpecialityResponse } from "@/types/apps/specialities";

const specialitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    specialities: builder.query<SpecialityResponse,void>({
      query: () => ({
        url: Api_Endpoint.getAllSpecilitiesApi,
      }),
    }),
  }),
});

export const {useSpecialitiesQuery} = specialitiesApi;

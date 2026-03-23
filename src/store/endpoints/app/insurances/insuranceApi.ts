import { SuccessApiResponse } from "@/types/apps";
import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import { InsuranceResponse } from "@/types/apps/insurance";

const insuranceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insuranceData: builder.query<InsuranceResponse, void>({
      query: () => ({
        url: Api_Endpoint.getAllInsuranceApi,
      }),
    }),
  }),
});

export const { useInsuranceDataQuery } = insuranceApi;

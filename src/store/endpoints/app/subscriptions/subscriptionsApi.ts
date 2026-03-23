import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import { SubscriptionApiResponse } from "@/types/apps/subscriptions";

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allSubscriptions: builder.query<SubscriptionApiResponse, void>({
      query: () => ({
        url: Api_Endpoint.getAllSubscriptionsApi,
      }),
    }),
  }),
});

export const { useAllSubscriptionsQuery } = subscriptionsApi;

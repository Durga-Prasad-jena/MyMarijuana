import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import store, { RootState } from "../Store";
import { clearMeData } from "./reducer/meDataReducer";

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.meData.access_token;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  if (!!result.error) {
    const status = result.error.status;
    if (status === 401) {
      store.dispatch(clearMeData());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "apiReducer",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["MeData","Specialty","Languages","Doctor"],
  endpoints: () => ({}),
});

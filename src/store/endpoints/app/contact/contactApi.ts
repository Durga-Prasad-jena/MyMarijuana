import { baseApi } from "../../baseApi";
import Api_Endpoint from "../../api_endpoints";
import {
  ContactApiResponseModel,
  ContactDetailResponse,
  ContactPayloadModel,
} from "@/types/apps/contact";
import { SuccessApiResponse } from "@/types/apps";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContact: builder.query<ContactApiResponseModel, ContactPayloadModel>({
      query: (params) => ({
        url: Api_Endpoint.getAllContactApi,
        params,
      }),
      providesTags: ["Contact"],
    }),
    contactDetail: builder.query<ContactDetailResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.contactDetailApi}/${id}`,
      }),
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<SuccessApiResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${Api_Endpoint.deleteContactApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetAllContactQuery,
  useContactDetailQuery,
  useDeleteContactMutation,
} = contactApi;

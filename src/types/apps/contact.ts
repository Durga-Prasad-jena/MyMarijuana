export interface ContactApiResponseModel {
  success: boolean;
  message: string;
  data: ContactModel[];
  pagination: Pagination;
}

export interface ContactModel {
  inquiryId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  status: string;
  adminNote: any;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface ContactPayloadModel {
  page: number;
  limit: number;
  keyword: string;
  status?: string;
}



export interface ContactDetailResponse {
  success: boolean
  message: string
  data: ContactDetailModel
}

export interface ContactDetailModel {
  inquiryId: string
  role: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  subject: string
  message: string
  status: string
  adminNote: any
  createdAt: string
  updatedAt: string
}

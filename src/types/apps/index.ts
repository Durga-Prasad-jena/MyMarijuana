export interface SuccessApiResponse {
  message: string;
}

export interface Pagination {
  totalItems: number
  page: number
  limit: number
  totalPages: number
}
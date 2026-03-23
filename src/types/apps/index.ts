export interface SuccessApiResponse {
  message: string;
}

export interface Pagination {
  totalItems: number
  page: number
  limit: number
  totalPages: number
}

export interface SearchKeywordModel{
  page:number;
  limit:number;
  keyword?:string
}
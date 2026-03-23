
export interface LanguageResponse {
  success: boolean;
  data: LanguageModel[];
  pagination: Pagination;
}

export interface LanguageModel {
  languageId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}
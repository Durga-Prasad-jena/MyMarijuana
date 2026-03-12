import { Pagination } from ".";

export interface LanguageResponse {
  success: boolean;
  data: LanguageModel[];
  pagination: Pagination;
}

export interface LanguageModel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
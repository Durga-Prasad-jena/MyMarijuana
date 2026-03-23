import { Pagination } from ".";

export interface TherapiesResponse {
  success: boolean;
  data: TherapiesModel[];
  pagination: Pagination;
}

export interface TherapiesModel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
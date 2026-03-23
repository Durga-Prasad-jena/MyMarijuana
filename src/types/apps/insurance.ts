import { Pagination } from ".";

export interface InsuranceResponse {
  success: boolean;
  data: InsuranceModel[];
  pagination: Pagination;
}

export interface InsuranceModel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

import { Pagination } from ".";

export interface SpecialityResponse {
  success: boolean;
  data: SpecialityModel[];
  pagination: Pagination;
}

export interface SpecialityModel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

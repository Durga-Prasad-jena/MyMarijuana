import { Pagination } from ".";

export interface SpecialtyResponse {
  success: boolean;
  data: SpecialtyModel[];
  pagination: Pagination;
}

export interface DetailSpecialtyResponse {
  success: boolean;
  data: SpecialtyModel;
  pagination: Pagination;
}

export interface SpecialtyModel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}





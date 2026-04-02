
export interface SpecialtyResponse {
  success: boolean;
  data: SpecialtyModel[];
  pagination: SpecialtyPagination;
}

export interface DetailSpecialtyResponse {
  success: boolean;
  data: SpecialtyModel;
  pagination: SpecialtyPagination;
}

export interface SpecialtyModel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpecialtyPagination{
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}





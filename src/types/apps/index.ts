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


export interface CreateDoctorResponse extends SuccessApiResponse{
  doctorId: string
}

export interface updateDoctorProfileResponse extends SuccessApiResponse{
  avatarUploadUrl:string;
  mediaUploadUrls: MediaUploadURLModel[]

}

export interface MediaUploadURLModel{
  uploadUrl: string
}
import { Pagination } from "./langauge";

export interface FaqResponseModel {
  success: boolean;
  data: FaqModel[];
  pagination: Pagination;
}

export interface FaqModel {
  faqId: string;
  question: string;
  answer: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFaqPayloadModel {
  question: string;
  answer: string;
}

export interface FaqDetailResponseModel {
  success: boolean
  data: FaqDetailModel
}

export interface FaqDetailModel {
  faqId: string
  question: string
  answer: string
  displayOrder: number
  createdAt: string
  updatedAt: string
}

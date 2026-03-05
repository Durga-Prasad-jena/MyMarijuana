// Define the error response type
export interface ErrorDetail {
  value: string; // Detailed error message (validation or other error)
}

export interface ApiErrorResponse {
  data: {
    message: string;
  };
  message?: string;
  path: string;
  status: number;
  timestamp: number;
  errors: ErrorDetail[]; // List of validation or specific error details
}

export default interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
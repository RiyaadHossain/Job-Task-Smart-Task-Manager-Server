export interface IAPIResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
}

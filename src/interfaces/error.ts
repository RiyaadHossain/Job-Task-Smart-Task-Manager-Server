export interface IAPIError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export interface IGenericErrorMessage {
  path: string;
  message: string;
}

export interface IGenericErrResponse {
  message: string;
  errors: IGenericErrorMessage[];
}

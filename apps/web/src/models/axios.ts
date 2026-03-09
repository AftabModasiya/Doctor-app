import { AxiosError, type AxiosResponse } from "axios";

type TApiResponse<T> = Promise<
  AxiosResponse<{ data: T; status: number; message: string }>
>;

type TApiFail = AxiosError<{
  message: string;
  status: number;
  errorMessage: string;
  errorStack: string;
}>;

export type { TApiResponse, TApiFail };

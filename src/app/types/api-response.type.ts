export type TApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  isSuccess: boolean;
};

export interface IResponseBody<T> {
  data: T;
  message: string;
  status: string;
}

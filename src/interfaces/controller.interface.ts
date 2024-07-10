export interface Controller<RequestBody, ResponseBody> {
  handle(input: RequestBody): Promise<ResponseBody>;
}

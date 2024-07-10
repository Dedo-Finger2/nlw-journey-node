export interface AppService<Request, Response> {
  execute(data: Request): Promise<Response>;
}

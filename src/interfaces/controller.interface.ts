import { FastifyRequest, FastifyReply } from "fastify";
import { HttpResponse } from "./http.type";

export type ControllerRequest<ControllerRequestBody> = FastifyRequest<{
  Body: ControllerRequestBody;
}>;
export type ControllerReply = FastifyReply;

export interface Controller<RequestBody, ResponseBody> {
  handle(
    request: ControllerRequest<RequestBody>,
    reply: ControllerReply
  ): Promise<HttpResponse<ResponseBody>>;
}

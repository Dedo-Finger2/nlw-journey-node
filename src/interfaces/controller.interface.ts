import { FastifyRequest, FastifyReply } from "fastify";
import { HttpResponse } from "./http.type";

export type ControllerRequest = FastifyRequest;
export type ControllerReply = FastifyReply;

export interface Controller<ResponseBody> {
  handle(
    request: ControllerRequest,
    reply: ControllerReply
  ): Promise<HttpResponse<ResponseBody>>;
}

import {
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface
} from "fastify";

export type ControllerRequest<ControllerRequestBody> = FastifyRequest<{
  Body: ControllerRequestBody;
}>;

export interface ReplyPayload<Payload> extends RouteGenericInterface {
  Reply: Payload;
}

export type ControllerReply<Payload> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  ReplyPayload<Payload>
>;

export interface Controller<RequestBody, SuccessResponseBody, ErrorResponseBody> {
  handle(
    request: ControllerRequest<RequestBody>,
    reply: ControllerReply<SuccessResponseBody | ErrorResponseBody>
  ): Promise<SuccessResponseBody | ErrorResponseBody>;
}

export enum HTTP_RESPONSE {
  BAD_REQUEST = 400,
  OK = 200,
  CREATED = 201,
  INTERNAL_SERVER_ERROR = 500
}

export type HttpResponse<Body> = {
  code: number;
  body: Body;
  error: boolean;
  success: boolean;
};

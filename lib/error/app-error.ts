export enum AppErrorType {
  unknown = -1,
  none = 0,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  unprocessableEntity = 422,
  internalServerError = 500,
  notImplemented = 501,
  serviceUnavailable = 503,
  connection = 1001,
}

/**
 * Common error structure used within app.
 */
export interface IAppErrorData {
  code: AppErrorType;
  message: string;
  data?: any;
}

/**
 * Common error used within app.
 */
export class AppError extends Error {
  public errorData: IAppErrorData;

  constructor(err: IAppErrorData) {
    super(err.message);
    this.errorData = err;
    this.name = "AppError";
  }
}

export class ConnectionAppError extends AppError {
  constructor() {
    super({ code: AppErrorType.connection, message: "Connection error" });
  }
}

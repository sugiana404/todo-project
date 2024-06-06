export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number,
    public errorCode: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request", details?: Record<string, any>) {
    super(message, 400, "BAD_REQUEST", details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized", details?: Record<string, any>) {
    super(message, 401, "UNAUTHORIZED", details);
  }
}

export class DataNotFoundError extends AppError {
  constructor(
    message: string = "Data Not Found",
    details?: Record<string, any>
  ) {
    super(message, 404, "DATA_NOT_FOUND", details);
  }
}

export class ResourceNotFoundError extends AppError {
  constructor(
    message: string = "Resource Not Found",
    details?: Record<string, any>
  ) {
    super(message, 404, "RESOURCE_NOT_FOUND", details);
  }
}

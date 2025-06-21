export class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: any[];
  isOperational: boolean;

  constructor(
    statusCode: number,
    message: string = "Something Went Wrong",
    errors: any[] = [],
    isOperational: boolean = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      success: this.success,
      errors: this.errors,
      isOperational: this.isOperational,
    };
  }
}

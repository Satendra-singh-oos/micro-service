class ApiError extends Error {
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
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.isOperational = isOperational;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };

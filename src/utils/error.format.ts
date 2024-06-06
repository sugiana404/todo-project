import type { Response } from "express";

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

export function formatError(
  errorCode: string,
  message: string,
  details?: Record<string, any>
) {
  return {
    error: {
      code: errorCode,
      message: message,
      details: details,
    },
  };
}

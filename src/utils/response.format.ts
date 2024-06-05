import type { Response } from "express";

export enum MethodType {
  Create = "Create",
  Read = "Read",
  Update = "Update",
  Delete = "Delete",
}

export async function formatResponse(
  res: Response,
  statusCode: number,
  methodType: MethodType,
  data?: any
) {
  if (!data) {
    res.status(statusCode).json({ method: methodType });
  }
  res.status(statusCode).json({ method: methodType, data: data });
}

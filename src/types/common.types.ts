import { ErrorCode, Role } from "./enum.types";

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface IntrospectResponse {
  valid: boolean;
  errorMessage: string;
  errorCode: ErrorCode;
}


export function isIntrospectResponse(obj: any): obj is IntrospectResponse {
  return (
    typeof obj === "object" &&
    "valid" in obj &&
    "errorMessage" in obj &&
    "errorCode" in obj
  );
}

export interface JwtPayload {
  id: number;
  role: Role;
  sub: string;
  exp: number;
  [key: string]: any; // để an toàn, phòng khi token có thêm fields khác
}
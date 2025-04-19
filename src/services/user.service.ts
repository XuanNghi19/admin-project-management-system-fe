import { ApiResponse } from "../types/common.types";
import { AuthenticationRequest, AuthenticationResponse } from "../types/user.types";
import apiClient from "../utils/axios";

export const login = async (data: AuthenticationRequest): Promise<ApiResponse<AuthenticationResponse | string>> => {
  const res = await apiClient.post(`user/login`, data);
  return res.data;
};
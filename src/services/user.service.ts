import { ApiResponse, IntrospectResponse } from "../types/common.types";
import { AuthenticationRequest, AuthenticationResponse } from "../types/user.types";
import apiClient from "../utils/axios";

export const login = async (data: AuthenticationRequest): Promise<ApiResponse<AuthenticationResponse | string>> => {
  const res = await apiClient.post("/user/login", data);
  return res.data;
};

export const introspect = async (data: string): Promise<ApiResponse<IntrospectResponse | string>> => {
  const res = await apiClient.post(`/user/introspect?token=${data}`);
  console.log("Headers:", res.config.headers);
  return res.data;
};

// export const introspect = async (data: string): Promise<ApiResponse<IntrospectResponse | string>> => {
//   try {
//     const res = await apiClient.post("/user/introspect", data);

//     console.log("✅ [introspect] Request:");
//     console.log("URL:", "/user/introspect");
//     console.log("Payload:", data);
//     console.log("Headers:", res.config.headers);
//     console.log("Method:", res.config.method);
//     console.log("Full config:", res.config); // toàn bộ request config
//     console.log("✅ [introspect] Response:", res.data);

//     return res.data;

//   } catch (error: any) {
//     if (error.response) {
//       console.error("❌ [introspect] Response error:", error.response);
//       console.error("Status:", error.response.status);
//       console.error("Data:", error.response.data);
//       console.error("Headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("❌ [introspect] No response received:", error.request);
//     } else {
//       console.error("❌ [introspect] Request setup error:", error.message);
//     }
//     throw error; // hoặc return custom error nếu bạn muốn
//   }
// };

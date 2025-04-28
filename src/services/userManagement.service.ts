import { ApiResponse } from "../types/common.types";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserListByPageResponse,
} from "../types/user.types";
import FormData from "form-data";
import apiClient from "../utils/axios";

export const addTeacher = async (
  requests: CreateUserRequest[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/user_management/add_teacher", requests);
  return res.data;
};

export const addStudent = async (
  requests: CreateUserRequest[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/user_management/add_student", requests);
  return res.data;
};

export const addAdmin = async (
  requests: CreateUserRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/user_management/add_admin", requests);
  return res.data;
};

export const updateUser = async (
  request: UpdateUserRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.put("/user_management/update_user", request);
  return res.data;
};

export const deleteUser = async (
  idNum_user: string
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.delete("/user_management/delete_user", {
    params: { idNum_user: idNum_user },
  });

  return res.data;
};

export const changePassword = async (
  idNum: string,
  newPassword: string
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.patch("/user_management/change_password", null, {
    params: { idNum_user: idNum, new_password: newPassword },
  });

  return res.data;
};

export const uploadAvatar = async (
  idNum: string,
  avatars: File[]
): Promise<ApiResponse<boolean | string>> => {
  const formData = new FormData();
  formData.append("idNum_user", idNum);
  avatars.forEach((avatar) => {
    formData.append("avatar_img", avatar);
  });

  const res = await apiClient.patch(
    "/user_management/upload_avatar",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

export const getAllUser = async (
  role: string,
  department_id: number | null,
  major_id: number | null,
  course_id: number | null,
  name: string | null,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<UserListByPageResponse | string>> => {

  const res = await apiClient.get("/user_management/get_all_user", {
    params: {
      role,
      department_id,
      major_id,
      course_id,
      name,
      page,
      limit,
    },
  });
  return res.data;
};

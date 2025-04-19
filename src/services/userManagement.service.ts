import { environment } from "../environments/environments";
import { ApiResponse } from "../types/common.types";
import { CreateUserRequest, UpdateUserRequest, UserListByPageResponse } from "../types/user.types";
import FormData from "form-data";
import axios from "axios";

const newUrl = `${environment.apiUrl}/user_management`;

export const addTeacher = async (
  requests: CreateUserRequest[]
): Promise<ApiResponse<boolean | string>> => {

  const data: ApiResponse<any> = (await axios.post(`${newUrl}/add_teacher`, requests)).data;
  return data;
};

export const addStudent = async (
  requests: CreateUserRequest[]
): Promise<ApiResponse<boolean | string>> => {

  const data: ApiResponse<any> = (await axios.post(`${newUrl}/add_student`, requests)).data;

  return data;
};

export const addAdmin = async (
  requests: CreateUserRequest[]
): Promise<ApiResponse<boolean | string>> => {
  
  const data: ApiResponse<boolean | string> = (await axios.post(`${newUrl}/add_admin`, requests)).data;
  return data;

};

export const updateUser = async (
  request: UpdateUserRequest
): Promise<ApiResponse<boolean | string>> => {

  const data: ApiResponse<any> = (await axios.put(`${environment.apiUrl}/update_user`, request)).data;
  return data;
};

export const deleteUser = async (
  idNum: string
): Promise<ApiResponse<boolean | string>> => {

  const data: ApiResponse<any> = (await axios.delete(`${environment.apiUrl}/delete_user`, {
    params: { idNum: idNum },
  })).data;

  return data;
};

export const changePassword = async (
  idNum: string,
  newPassword: string
): Promise<ApiResponse<boolean | string>> => {

  const data: ApiResponse<any> = (await axios.patch(`${environment.apiUrl}/change_password`, null, {
    params: { idNum: idNum, newPassword: newPassword },
  })).data;

  return data;
};

export const uploadAvatar = async (
  idNum: string,
  avatars: File[]
): Promise<ApiResponse<boolean | string>> => {
  const formData = new FormData();
  formData.append("idNum", idNum);
  avatars.forEach((avatar, index) => {
    formData.append("avatar img", avatar);
  });

  const res = await axios.patch(
    `${environment.apiUrl}/upload_avatar`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

export const getAllUser = async (
  role: string,
  departmentId?: number,
  majorId?: number,
  courseId?: number,
  name?: string,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<UserListByPageResponse | string>> => {
  const res = await axios.get(`${environment.apiUrl}/get_all_user`, {
    params: {
      role,
      departmentId,
      majorId,
      courseId,
      name,
      page,
      limit,
    },
  });
  return res.data;
};
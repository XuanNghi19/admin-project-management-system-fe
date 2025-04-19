import axios from "axios";
import { environment } from "../environments/environments";
import { CRUDDepartment, DepartmentListByPageResponse } from "../types/department.types";
import { ApiResponse } from "../types/common.types";

const newUrl = `${environment.apiUrl}/department_management`;

export const addDepartment = async (
  requests: CRUDDepartment[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.post(`${newUrl}/add_department`, requests);
  return res.data;
};

export const updateDepartment = async (
  request: CRUDDepartment
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.put(`${newUrl}/update_department`, request);
  return res.data;
};

export const deleteDepartment = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.delete(`${newUrl}/delete_department`, {
    params: { "id department": id },
  });
  return res.data;
};

export const getAllDepartment = async (
  name: string | null,
  page: number,
  limit: number
): Promise<ApiResponse<DepartmentListByPageResponse | string>> => {
  const res = await axios.get(`${newUrl}/get_all_department`, {
    params: {
      name,
      page,
      limit,
    },
  });
  return res.data;
};

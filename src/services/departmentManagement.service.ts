import { CRUDDepartment, DepartmentListByPageResponse } from "../types/department.types";
import { ApiResponse } from "../types/common.types";
import apiClient from "../utils/axios";

export const addDepartment = async (
  requests: CRUDDepartment[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/department_management/add_department", requests);
  return res.data;
};

export const updateDepartment = async (
  request: CRUDDepartment
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.put("/department_management/update_department", request);
  return res.data;
};

export const deleteDepartment = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.delete("/department_management/delete_department", {
    params: { "id department": id },
  });
  return res.data;
};

export const getAllDepartment = async (
  name: string | null,
  page: number,
  limit: number
): Promise<ApiResponse<DepartmentListByPageResponse | string>> => {
  const res = await apiClient.get("/department_management/get_all_department", {
    params: {
      name,
      page,
      limit,
    },
  });
  return res.data;
};

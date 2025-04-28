import { CRUDMajor, MajorListByPageResponse } from "../types/major.types";
import { ApiResponse } from "../types/common.types";
import apiClient from "../utils/axios";

export const addMajor = async (
  request: CRUDMajor[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/major_management/add_major", request);
  return res.data;
};

export const updateMajor = async (
  request: CRUDMajor
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.put("/major_management/update_major", request);
  return res.data;
};

export const deleteMajor = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.delete("/major_management/delete_major", {
    params: { "id major": id },
  });
  return res.data;
};

export const getAllMajor = async (
  name: string | null,
  departmentID: number | null,
  page: number,
  limit: number
): Promise<ApiResponse<MajorListByPageResponse | string>> => {
  const res = await apiClient.get("/major_management/get_all_major", {
    params: {
      name,
      "id department": departmentID,
      page,
      limit,
    },
  });
  return res.data;
};

import axios from "axios";
import { environment } from "../environments/environments";
import { CRUDMajor, MajorListByPageResponse } from "../types/major.types";
import { ApiResponse } from "../types/common.types";

const newUrl = `${environment.apiUrl}/major_management`;

export const addMajor = async (
  request: CRUDMajor[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.post(`${newUrl}/add_major`, request);
  return res.data;
};

export const updateMajor = async (
  request: CRUDMajor
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.put(`${newUrl}/update_major`, request);
  return res.data;
};

export const deleteMajor = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.delete(`${newUrl}/delete_major`, {
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
  const res = await axios.get(`${newUrl}/get_all_major`, {
    params: {
      name,
      "id department": departmentID,
      page,
      limit,
    },
  });
  return res.data;
};

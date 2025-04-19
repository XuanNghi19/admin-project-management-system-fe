import axios from "axios";
import { environment } from "../environments/environments";
import { CouncilDetailResponse, CouncilListByPageResponse, CreateCouncilRequest, UpdateCouncilRequest } from "../types/council.types";
import { ApiResponse } from "../types/common.types";

const newUrl = `${environment.apiUrl}/council_management`;

export const addCouncil = async (
  request: CreateCouncilRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.post(`${newUrl}/add_council`, request);
  return res.data;
};

export const updateCouncil = async (
  request: UpdateCouncilRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.put(`${newUrl}/update_council`, request);
  return res.data;
};

export const deleteCouncil = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.delete(`${newUrl}/delete_council`, {
    params: {
      "id council": id,
    },
  });
  return res.data;
};

export const getAllCouncil = async (
  name: string | null,
  topicSemesterID: number | null,
  departmentID: number | null,
  startTime: string | null, // string: "yyyy-MM-dd HH:mm:ss"
  endTime: string | null,
  page: number,
  limit: number
): Promise<ApiResponse<CouncilListByPageResponse | string>> => {
  const res = await axios.get(`${newUrl}/get_all_council`, {
    params: {
      name,
      "topic semester id": topicSemesterID,
      "department id": departmentID,
      start: startTime,
      end: endTime,
      page,
      limit,
    },
  });
  return res.data;
};

export const getCouncilDetail = async (
  id: number
): Promise<ApiResponse<CouncilDetailResponse | string>> => {
  const res = await axios.get(`${newUrl}/get_council_detail`, {
    params: {
      "id council": id,
    },
  });
  return res.data;
};

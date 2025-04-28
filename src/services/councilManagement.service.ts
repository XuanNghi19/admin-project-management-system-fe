import { CouncilDetailResponse, CouncilListByPageResponse, CreateCouncilRequest, UpdateCouncilRequest } from "../types/council.types";
import { ApiResponse } from "../types/common.types";
import apiClient from "../utils/axios";

export const addCouncil = async (
  request: CreateCouncilRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/council_management/add_council", request);
  return res.data;
};

export const updateCouncil = async (
  request: UpdateCouncilRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.put("/council_management/update_council", request);
  return res.data;
};

export const deleteCouncil = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.delete("/council_management/delete_council", {
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
  const res = await apiClient.get("/council_management/get_all_council", {
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
  const res = await apiClient.get("/council_management/get_council_detail", {
    params: {
      "id council": id,
    },
  });
  return res.data;
};

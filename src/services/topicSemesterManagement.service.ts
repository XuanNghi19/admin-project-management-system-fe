import { CRUDTopicSemester, TopicSemesterListByPageResponse } from "../types/topicSemester.types";
import { ApiResponse } from "../types/common.types";
import apiClient from "../utils/axios";

export const addTopicSemester = async (
  requests: CRUDTopicSemester[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/topic_semester_management/add_topic_semester", requests);
  return res.data;
};

export const updateTopicSemester = async (
  request: CRUDTopicSemester
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.put("/topic_semester_management/update_topic_semester", request);
  return res.data;
};

export const deleteTopicSemester = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.delete("/topic_semester_management/delete_topic_semester", {
    params: { "id TopicSemester": id },
  });
  return res.data;
};

export const getAllTopicSemester = async (
  name: string | null,
  start: string | null, // format: yyyy-MM-dd HH:mm:ss
  end: string | null,   // format: yyyy-MM-dd HH:mm:ss
  page: number,
  limit: number
): Promise<ApiResponse<TopicSemesterListByPageResponse | string>> => {
  const res = await apiClient.get("/topic_semester_management/get_all_topic_semester", {
    params: {
      name,
      start,
      end,
      page,
      limit,
    },
  });
  return res.data;
};

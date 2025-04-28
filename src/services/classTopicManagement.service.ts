import { ApiResponse } from "../types/common.types";
import { ClassTopicDetailResponse, ClassTopicListByPageResponse, CreateClassTopicRequest, UpdateClassTopicRequest } from "../types/classTopic.types";
import apiClient from "../utils/axios";

export const addClassTopic = async (
  request: CreateClassTopicRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.post("/class_topic_management/add_class_topic", request);
  return res.data;
};

export const updateClassTopic = async (
  request: UpdateClassTopicRequest
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.put("/class_topic_management/update_class_topic", request);
  return res.data;
};

export const deleteClassTopic = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.delete("/class_topic_management/delete_class_topic", {
    params: { "id class topic": id },
  });
  return res.data;
};

export const getAllClassTopic = async (
  name: string | null,
  topicSemesterID: number | null,
  majorID: number | null,
  page: number,
  limit: number
): Promise<ApiResponse<ClassTopicListByPageResponse | string>> => {
  const res = await apiClient.get("/class_topic_management/get_all_class_topic", {
    params: {
      name: name ?? undefined,
      "topic semester id": topicSemesterID ?? undefined,
      "major id": majorID ?? undefined,
      page,
      limit,
    },
  });
  return res.data;
};

export const getClassTopicDetail = async (
  id: number
): Promise<ApiResponse<ClassTopicDetailResponse | string>> => {
  const res = await apiClient.get("/class_topic_management/get_detail_class_topic", {
    params: { "id class topic": id },
  });
  return res.data;
};

import { ApiResponse } from "../types/common.types";
import { TopicDetailsResponse, TopicListByPageResponse } from "../types/topic.types";
import apiClient from "../utils/axios";


export const approveTopicGrade = async (
  idNum: string
): Promise<ApiResponse<number | string>> => {
  const res = await apiClient.patch("/topic_management/approve_grade", null, {
    params: { "idNum topic": idNum },
  });
  return res.data;
};

export const deleteTopic = async (
  idNum: string
): Promise<ApiResponse<boolean | string>> => {
  const res = await apiClient.delete("/topic_management/delete_topic", {
    params: { "idNum topic": idNum },
  });
  return res.data;
};

export const getAllTopic = async (
  name: string | null,
  topicSemesterID: number | null,
  majorID: number | null,
  page: number,
  limit: number
): Promise<ApiResponse<TopicListByPageResponse | string>> => {
  const res = await apiClient.get("/topic_management/get_all_topic", {
    params: {
      name,
      "topic semester id": topicSemesterID,
      "major id": majorID,
      page,
      limit,
    },
  });
  return res.data;
};

export const getDetailTopic = async (
  idNum: string
): Promise<ApiResponse<TopicDetailsResponse | string>> => {
  const res = await apiClient.get("/topic_management/get_detail_topic", {
    params: { "idNum topic": idNum },
  });
  return res.data;
};

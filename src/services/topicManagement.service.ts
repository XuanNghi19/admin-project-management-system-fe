import axios from "axios";
import { environment } from "../environments/environments";
import { ApiResponse } from "../types/common.types";
import { TopicDetailsResponse, TopicListByPageResponse } from "../types/topic.types";

const newUrl = `${environment.apiUrl}/topic_management`;

export const approveTopicGrade = async (
  idNum: string
): Promise<ApiResponse<number | string>> => {
  const res = await axios.patch(`${newUrl}/approve_grade`, null, {
    params: { "idNum topic": idNum },
  });
  return res.data;
};

export const deleteTopic = async (
  idNum: string
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.delete(`${newUrl}/delete_topic`, {
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
  const res = await axios.get(`${newUrl}/get_all_topic`, {
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
  const res = await axios.get(`${newUrl}/get_detail_topic`, {
    params: { "idNum topic": idNum },
  });
  return res.data;
};

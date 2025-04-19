import axios from "axios";
import { environment } from "../environments/environments";
import { CRUDTopicSemester, TopicSemesterListByPageResponse } from "../types/topicSemester.types";
import { ApiResponse } from "../types/common.types";

const newUrl = `${environment.apiUrl}/topic_semester_management`;

export const addTopicSemester = async (
  requests: CRUDTopicSemester[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.post(`${newUrl}/add_topic_semester`, requests);
  return res.data;
};

export const updateTopicSemester = async (
  request: CRUDTopicSemester
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.put(`${newUrl}/update_topic_semester`, request);
  return res.data;
};

export const deleteTopicSemester = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.delete(`${newUrl}/delete_topic_semester`, {
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
  const res = await axios.get(`${newUrl}/get_all_topic_semester`, {
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

import { ApiResponse } from "../types/common.types";
import { CRUDDepartment } from "../types/department.types";
import { CRUDMajor } from "../types/major.types";
import { CRUDTopicSemester } from "../types/topicSemester.types";
import { CRUDCourse } from "../types/course.types";
import apiClient from "../utils/axios";

export const searchDepartment = async (
  name: string | null
): Promise<ApiResponse<CRUDDepartment[] | string>> => {
  const res = await apiClient.get("/lookup/search_department", {
    params: { name },
  });
  return res.data;
};

export const searchMajor = async (
  name: string | null
): Promise<ApiResponse<CRUDMajor[] | string>> => {
  const res = await apiClient.get("/lookup/search_major", {
    params: { name },
  });
  return res.data;
};

export const searchTopicSemester = async (
  name: string | null
): Promise<ApiResponse<CRUDTopicSemester[] | string>> => {
  const res = await apiClient.get("/lookup/search_topic_semester", {
    params: { name },
  });
  return res.data;
};

export const searchCourse = async (
  name: string | null
): Promise<ApiResponse<CRUDCourse[] | string>> => {
  const res = await apiClient.get("/lookup/search_course", {
    params: { name },
  });
  return res.data;
};

import axios from "axios";
import { environment } from "../environments/environments";
import { ApiResponse } from "../types/common.types";
import { CRUDDepartment } from "../types/department.types";
import { CRUDMajor } from "../types/major.types";
import { CRUDTopicSemester } from "../types/topicSemester.types";
import { CRUDCourse } from "../types/course.types";

const newUrl = `${environment.apiUrl}/lookup`;

export const searchDepartment = async (
  name: string | null
): Promise<ApiResponse<CRUDDepartment[] | string>> => {
  const res = await axios.get(`${newUrl}/search_department`, {
    params: { name },
  });
  return res.data;
};

export const searchMajor = async (
  name: string | null
): Promise<ApiResponse<CRUDMajor[] | string>> => {
  const res = await axios.get(`${newUrl}/search_major`, {
    params: { name },
  });
  return res.data;
};

export const searchTopicSemester = async (
  name: string | null
): Promise<ApiResponse<CRUDTopicSemester[] | string>> => {
  const res = await axios.get(`${newUrl}/search_topic_semester`, {
    params: { name },
  });
  return res.data;
};

export const searchCourse = async (
  name: string | null
): Promise<ApiResponse<CRUDCourse[] | string>> => {
  const res = await axios.get(`${newUrl}/search_course`, {
    params: { name },
  });
  return res.data;
};

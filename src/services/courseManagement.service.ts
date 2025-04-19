import axios from "axios";
import { environment } from "../environments/environments";
import { CourseListByPageResponse, CRUDCourse } from "../types/course.types";
import { ApiResponse } from "../types/common.types";

const courseUrl = `${environment.apiUrl}/course_management`;

export const addCourse = async (
  requests: CRUDCourse[]
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.post(`${courseUrl}/add_course`, requests);
  return res.data;
};

export const updateCourse = async (
  request: CRUDCourse
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.put(`${courseUrl}/update_course`, request);
  return res.data;
};

export const deleteCourse = async (
  id: number
): Promise<ApiResponse<boolean | string>> => {
  const res = await axios.delete(`${courseUrl}/delete_course`, {
    params: {
      "id course": id,
    },
  });
  return res.data;
};

export const getAllCourse = async (
  name: string | null,
  start: string | null, // string: "yyyy-MM-dd HH:mm:ss"
  end: string | null,
  page: number,
  limit: number
): Promise<ApiResponse<CourseListByPageResponse | string>> => {
  const res = await axios.get(`${courseUrl}/get_all_course`, {
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

import { CRUDTopicSemester } from "./topicSemester.types";
import { CRUDMajor } from "./major.types";
import { UserResponse } from "./user.types";
import { CUDStudentTopicRequest, StudentTopicResponse } from "./studentTopic.types";

export interface ClassTopicDetailResponse {
  id: number;
  className: string;
  teacher: UserResponse;
  startRegistrationTime: string; // ISO 8601 date-time string
  endRegistrationTime: string;
  topicSemester: CRUDTopicSemester;
  major: CRUDMajor;
  studentTopicList: StudentTopicResponse[];
}

export interface ClassTopicListByPageResponse {
  list: ClassTopicResponse[];
  totalPage: number;
  crrPage: number;
  limit: number;
}

export interface ClassTopicResponse {
  id: number;
  teacher: UserResponse;
  className: string;
  startRegistrationTime: string;
  endRegistrationTime: string;
  topicSemester: CRUDTopicSemester;
  major: CRUDMajor;
}

export interface CreateClassTopicRequest {
  teacherIdNum: string;
  className: string;
  startRegistrationTime: string; // ISO 8601 string (ex: "2025-04-14T13:00:00")
  endRegistrationTime: string;
  topicSemesterID: number;
  majorID: number;
  studentTopicList: CUDStudentTopicRequest[];
}

export interface UpdateClassTopicRequest {
  id: number;
  className: string;
  teacherIdNum: string;
  startRegistrationTime: string;
  endRegistrationTime: string;
  majorID: number;
  studentTopicList: CUDStudentTopicRequest[];
}

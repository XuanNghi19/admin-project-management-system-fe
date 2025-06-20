import { CRUDTopicSemester } from "./topicSemester.types";
import { CRUDDepartment } from "./department.types";
import { CRUDDefenseSchedule } from "./defenseSchedule.types";
import { CRUDBoardMember } from "./boardMember.types";

export interface CouncilDetailResponse {
  id: number;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  topicSemester: CRUDTopicSemester;
  department: CRUDDepartment;
  fileUrl: string;
  defenseScheduleList: CRUDDefenseSchedule[];
  boardMemberList: CRUDBoardMember[];
}

export interface CouncilListByPageResponse {
  list: CouncilResponse[];
  totalPage: number;
  crrPage: number;
  limit: number;
}

export interface CouncilResponse {
  id: number;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  topicSemester: CRUDTopicSemester;
  department: CRUDDepartment;
}

export interface CreateCouncilRequest {
  name: string;
  fileUrl: string;
  location: string;
  startTime: string;
  endTime: string;
  topicSemesterID: number;
  departmentID: number;
  scheduleRequests: CRUDDefenseSchedule[];
  boardMemberList: CRUDBoardMember[];
}

export interface UpdateCouncilRequest {
  id: number;
  name: string;
  fileUrl: string;
  location: string;
  startTime: string;
  endTime: string;
  topicSemesterID: number;
  departmentID: number;
  scheduleRequests: CRUDDefenseSchedule[];
  boardMemberList: CRUDBoardMember[];
}

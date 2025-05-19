import { ProjectStage } from "./enum.types";
import { GradeResponse } from "./grade.types";
import { CRUDTopicSemester } from "./topicSemester.types";
import { CRUDMajor } from "./major.types";
import { TeamResponse } from "./team.types";
import { TaskResponse } from "./task.types";
import { AnnouncementResponse } from "./announcement.types";
import { FilesUrlResponse } from "./filesUrl.types";
import { EvaluationResponse } from "./evaluation.types";
import { MeetingResponse } from "./meeting.types";
import { DefenseScheduleForTopicResponse } from "./defenseSchedule.types";

export interface CreateTopicRequest {
  startTime: string; // ISO 8601 date-time string
  endTime: string; // ISO 8601 date-time string
  name: string;
  courseID: number;
  majorID: number;
}

export interface TopicDetailsResponse {
  idNum: string;
  startTime: string; // ISO 8601 date-time string
  endTime: string; // ISO 8601 date-time string
  name: string;
  startSubmissionDate: string; // ISO 8601 date-time string
  endSubmissionDate: string; // ISO 8601 date-time string
  projectStage: ProjectStage;
  grade: GradeResponse;
  topicSemester: CRUDTopicSemester;
  major: CRUDMajor;
  team: TeamResponse;
  taskList: TaskResponse[];
  announcementList: AnnouncementResponse[];
  filesUrlList: FilesUrlResponse[];
  evaluationList: EvaluationResponse[];
  meetingList: MeetingResponse[];
  defenseSchedule: DefenseScheduleForTopicResponse;
}

export interface TopicListByPageResponse {
  list: TopicResponse[];
  totalPage: number;
  crrPage: number;
  limit: number;
}

export interface TopicResponse {
  idNum: string;
  name: string;
  major: CRUDMajor;
  projectStage: ProjectStage;
  topicSemester: CRUDTopicSemester;
  grade: GradeResponse;
}

export interface UpdateTopicRequest {
  startTime: string; // ISO 8601 date-time string
  endTime: string; // ISO 8601 date-time string
  name: string;
  startSubmissionDate: string; // ISO 8601 date-time string
  endSubmissionDate: string; // ISO 8601 date-time string
  projectStage: ProjectStage;
  grade: GradeResponse;
}

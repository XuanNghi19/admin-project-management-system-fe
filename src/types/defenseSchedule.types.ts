import { ActionTypes } from "./enum.types";
import { TopicResponse } from "./topic.types";

export interface CRUDDefenseSchedule {
  id: number;
  action: ActionTypes;
  topic: TopicResponse;
  startTime: string; // ISO 8601 date-time string
  endTime: string; // ISO 8601 date-time string
  note: string;
}

export interface DefenseScheduleForTopicResponse {
  id: number;
  startTime: string; // ISO 8601 date-time string
  endTime: string; // ISO 8601 date-time string
  location: string;
  note: string;
}

export interface CRUDTopicSemester {
  id: number;
  name: string;
  startTime: string; // ISO datetime string (e.g., "2025-04-14T09:30:00")
  endTime: string;
}

export interface TopicSemesterListByPageResponse {
  list: CRUDTopicSemester[];
  totalPage: number;
  crrPage: number;
  limit: number;
}

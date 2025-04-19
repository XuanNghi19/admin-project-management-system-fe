export interface CRUDCourse {
  id: number;
  name: string;
  startTime: string; // ISO datetime format
  endTime: string;
}

export interface CourseListByPageResponse {
  list: CRUDCourse[];
  totalPage: number;
  crrPage: number;
  limit: number;
}
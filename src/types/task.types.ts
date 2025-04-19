import { ProjectStage } from "./enum.types";

export interface TaskResponse {
  id: number;
  title: string;
  describe: string;
  deadline: string; // ISO 8601 date-time string
  comment: string;
  status: boolean;
  projectStage: ProjectStage;
}

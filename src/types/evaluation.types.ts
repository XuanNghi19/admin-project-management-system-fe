import { ProjectStage } from "./enum.types";

export interface EvaluationResponse {
  id: number;
  comment: string;
  dateCommented: string; // ISO 8601 date-time string
  grade: number;
  projectStage: ProjectStage;
}

import { ProjectStage } from "./enum.types";

export interface AnnouncementResponse {
  id: number;
  title: string;
  content: string;
  datePosted: string; // ISO 8601 date string (e.g. "2025-04-14")
  projectStage: ProjectStage;
}
import { ProjectStage } from "./enum.types";

export interface FilesUrlResponse {
  id: number;
  uri: string;
  projectStage: ProjectStage;
}

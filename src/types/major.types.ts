import { CRUDDepartment } from "./department.types";

export interface CRUDMajor {
  id: number | null;
  name: string;
  progressPercentage: number;
  reportPercentage: number;
  defensePercentage: number;
  reviewPercentage: number;
  department: CRUDDepartment;
}

export interface MajorListByPageResponse {
  list: CRUDMajor[];
  totalPage: number;
  crrPage: number;
  limit: number;
}
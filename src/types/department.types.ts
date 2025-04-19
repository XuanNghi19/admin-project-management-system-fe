export interface CRUDDepartment {
  id: number;
  name: string;
  description: string;
}

export interface DepartmentListByPageResponse {
  list: CRUDDepartment[];
  totalPage: number;
  crrPage: number;
  limit: number;
}
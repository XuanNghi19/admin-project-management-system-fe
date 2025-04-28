// types/UserResponse.ts
import { CRUDCourse } from "./course.types";
import { CRUDDepartment } from "./department.types";
import { CRUDMajor } from "./major.types";

export interface AuthenticationRequest {
  idNum: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  authenticated: boolean;
}

export interface CreateUserRequest {
  name: string;
  age: number;
  password: string;
  dob: string;
  cccd: string | null;
  email: string;
  phoneNumber: string | null;
  sex: string | null;
  address: string | null;

  courseId: number | null;
  departmentId: number;
  majorId: number;
}

export interface UpdateUserRequest {
  idNum: string;
  name: string;
  age: number;
  dob: string;
  cccd: string;
  email: string;
  phoneNumber: string;
  sex: string;
  address: string;

  courseId: number;
  departmentId: number;
  majorId: number;
}

export interface UserResponse {
  idNum: string;
  name: string;
  age: number;
  dob: string;
  cccd: string;
  email: string;
  phoneNumber: string;
  sex: string;
  avatarUrl: string;
  address: string;

  course: CRUDCourse;
  department: CRUDDepartment;
  major: CRUDMajor;
}

export interface UserListByPageResponse {
  list: UserResponse[];
  totalPage: number;
  crrPage: number;
  limit: number;
}
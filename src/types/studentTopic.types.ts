import { ActionTypes } from "./enum.types";
import { UserResponse } from "./user.types";

export interface CUDStudentTopicRequest {
  id: number;
  studentIdNum: string;
  status: boolean;
  action: ActionTypes;
}

export interface StudentTopicResponse {
  id: number;
  student: UserResponse;
  status: boolean;
}

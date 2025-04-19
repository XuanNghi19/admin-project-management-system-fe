import { ActionTypes } from "./enum.types";
import { UserResponse } from "./user.types";

export interface CRUDBoardMember {
  id: number;
  position: string;
  user: UserResponse;
  action: ActionTypes;
}
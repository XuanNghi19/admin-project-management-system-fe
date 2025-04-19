import { UserResponse } from "./user.types";
import { MembershipPosition } from "./enum.types";
import { CRUDTopicSemester } from "./topicSemester.types";
import { CRUDMajor } from "./major.types";

export interface TeamMemberResponse {
  id: number;
  student: UserResponse;
  position: MembershipPosition;
}

export interface TeamResponse {
  id: number;
  teacher: UserResponse;
  groupName: string;
  topicSemester: CRUDTopicSemester;
  major: CRUDMajor;
  teamMemberResponseList: TeamMemberResponse[];
}

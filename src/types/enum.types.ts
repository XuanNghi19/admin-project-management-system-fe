export enum ActionTypes {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum ErrorCode {
  TOKEN_INVALID = "TOKEN_INVALID",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
}

export enum MembershipPosition {
  Leader = "Leader",
  Member = "Member",
}

export enum ProjectStage {
  PENDING = "PENDING",               // Đang chờ duyệt
  IDEATION = "IDEATION",              // Lên ý tưởng và xác định đề tài
  PLANNING = "PLANNING",              // Lập kế hoạch và phân công công việc
  REQUIREMENT_ANALYSIS = "REQUIREMENT_ANALYSIS",  // Nghiên cứu và phân tích yêu cầu
  DESIGN = "DESIGN",                // Thiết kế và xây dựng
  DEVELOPMENT = "DEVELOPMENT",           // Triển khai và phát triển
  TESTING = "TESTING",               // Kiểm tra và hoàn thiện
  DEFENSE = "DEFENSE"              // Bảo vệ và đánh giá
}

export enum Role {
  STUDENT = "STUDENT",
  INSTRUCTORS = "INSTRUCTORS",
  ADMIN = "ADMIN",
}
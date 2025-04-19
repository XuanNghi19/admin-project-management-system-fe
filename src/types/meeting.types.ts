export interface MeetingResponse {
  id: number;
  title: string;
  startTime: string; // ISO 8601 datetime string
  endTime: string;
  location: string;
  note: string;
}

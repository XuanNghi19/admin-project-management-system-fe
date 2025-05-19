import { MeetingResponse } from "../../types/meeting.types";

export const MeetingList = ({ meetings }: { meetings: MeetingResponse[] | null}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Lịch họp</h2>
      <div className="space-y-4">
        {meetings?.map((meeting) => (
          <div key={meeting.id} className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">{meeting.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
              <p><span className="font-medium">Thời gian:</span> {new Date(meeting.startTime).toLocaleString('vi-VN')} - {new Date(meeting.endTime).toLocaleTimeString('vi-VN')}</p>
              <p><span className="font-medium">Địa điểm:</span> {meeting.location}</p>
            </div>
            {meeting.note && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-gray-700">
                <span className="font-medium">Ghi chú:</span> {meeting.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
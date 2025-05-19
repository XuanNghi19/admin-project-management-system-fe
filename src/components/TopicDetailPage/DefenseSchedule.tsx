import { DefenseScheduleForTopicResponse } from "../../types/defenseSchedule.types";

export const DefenseSchedule = ({ schedule }: { schedule: DefenseScheduleForTopicResponse | null}) => {
  const hasSchedule = schedule && schedule.id > 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Lịch bảo vệ</h2>
      {hasSchedule ? (
        <div className="border-l-4 border-green-500 pl-4 py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
            <p><span className="font-medium">Thời gian:</span> {new Date(schedule.startTime).toLocaleString('vi-VN')} - {new Date(schedule.endTime).toLocaleTimeString('vi-VN')}</p>
            <p><span className="font-medium">Địa điểm:</span> {schedule.location}</p>
          </div>
          {schedule.note && (
            <div className="mt-2 text-gray-700">
              <span className="font-medium">Ghi chú:</span> {schedule.note}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600 italic">Chưa có lịch bảo vệ</p>
      )}
    </div>
  );
};
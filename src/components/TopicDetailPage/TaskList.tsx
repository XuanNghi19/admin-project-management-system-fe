import { ProjectStageOptions } from "../../types/enum.types";
import { TaskResponse } from "../../types/task.types";

export const TaskList = ({ tasks }: { tasks: TaskResponse[] | null}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Danh sách công việc</h2>
      <div className="space-y-4">
        {tasks?.map((task) => (
          <div key={task.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{task.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
              }`}>
                {task.status ? "Hoàn thành" : "Đang thực hiện"}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{task.describe}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <p><span className="font-medium">Hạn nộp:</span> {new Date(task.deadline).toLocaleDateString('vi-VN')}</p>
              <p><span className="font-medium">Giai đoạn:</span> {
                ProjectStageOptions.find(opt => opt.value === task.projectStage)?.label || task.projectStage
              }</p>
            </div>
            {task.comment && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-gray-700">
                <span className="font-medium">Nhận xét:</span> {task.comment}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
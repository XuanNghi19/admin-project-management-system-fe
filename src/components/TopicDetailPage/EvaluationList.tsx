import { ProjectStageOptions } from "../../types/enum.types";
import { EvaluationResponse } from "../../types/evaluation.types";

export const EvaluationList = ({ evaluations }: { evaluations: EvaluationResponse[] | null}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Đánh giá</h2>
      <div className="space-y-4">
        {evaluations?.map((evaluation) => (
          <div key={evaluation.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Đánh giá giai đoạn: {
                ProjectStageOptions.find(opt => opt.value === evaluation.projectStage)?.label || evaluation.projectStage
              }</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">{new Date(evaluation.dateCommented).toLocaleDateString('vi-VN')}</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  Điểm: {evaluation.grade}
                </span>
              </div>
            </div>
            <p className="text-gray-700">{evaluation.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
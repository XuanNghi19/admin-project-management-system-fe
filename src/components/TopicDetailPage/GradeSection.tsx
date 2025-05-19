import { GradeResponse } from "../../types/grade.types";
import { CRUDMajor } from "../../types/major.types";

export const GradeSection = ({ grade, major }: { grade: GradeResponse | null, major: CRUDMajor | null }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Điểm số</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Tiến độ ({major?.progressPercentage}%)</p>
          <p className="text-xl font-bold text-blue-700">{grade?.progressScore}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Báo cáo ({major?.reportPercentage}%)</p>
          <p className="text-xl font-bold text-blue-700">{grade?.reportScore}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Đánh giá ({major?.reviewPercentage}%)</p>
          <p className="text-xl font-bold text-blue-700">{grade?.reviewScore}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Bảo vệ ({major?.defensePercentage}%)</p>
          <p className="text-xl font-bold text-blue-700">{grade?.defenseScore || "Chưa có"}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Tổng kết</p>
          <p className="text-xl font-bold text-green-700">{grade?.finalScore || "Chưa có"}</p>
        </div>
      </div>
    </div>
  );
};
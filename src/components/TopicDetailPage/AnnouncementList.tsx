import { AnnouncementResponse } from "../../types/announcement.types";
import { ProjectStageOptions } from "../../types/enum.types";

export const AnnouncementList = ({ announcements }: { announcements: AnnouncementResponse[] | null}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Thông báo</h2>
      <div className="space-y-4">
        {announcements?.map((ann) => (
          <div key={ann.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium text-lg">{ann.title}</h3>
              <span className="text-sm text-gray-500">{new Date(ann.datePosted).toLocaleDateString('vi-VN')}</span>
            </div>
            <p className="text-gray-700">{ann.content}</p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Giai đoạn:</span> {
                ProjectStageOptions.find(opt => opt.value === ann.projectStage)?.label || ann.projectStage
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

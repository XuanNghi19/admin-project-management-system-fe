import { ProjectStageOptions } from "../../types/enum.types";
import { FilesUrlResponse } from "../../types/filesUrl.types";

export const FilesList = ({ files }: { files: FilesUrlResponse[] | null}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tài liệu</h2>
      <div className="space-y-2">
        {files?.map((file) => (
          <div key={file.id} className="flex items-center p-3 border rounded-lg">
            <div className="flex-1">
              <a href={file.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {file.uri.split('/').pop()}
              </a>
            </div>
            <span className="text-sm text-gray-600">
              {ProjectStageOptions.find(opt => opt.value === file.projectStage)?.label || file.projectStage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
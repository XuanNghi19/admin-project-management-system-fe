import { format } from "date-fns";
import { ProjectStage, ProjectStageOptions } from "../../types/enum.types";
import { TopicDetailsResponse } from "../../types/topic.types";

export const TopicHeader = ({ topic }: { topic: TopicDetailsResponse | null}) => {
  const getStageLabel = (stage: ProjectStage) => {
    const option = ProjectStageOptions.find(opt => opt.value === stage);
    return option ? option.label : stage;
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-800">{topic?.name}</h1>
        <span className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm font-medium">
          {getStageLabel(topic?.projectStage ?? ProjectStage.IDEATION)}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="flex items-center"><span className="font-medium mr-2">Mã đề tài:</span> {topic?.idNum}</p>
          <p className="flex items-center"><span className="font-medium mr-2">Thời gian:</span> 
            {format(topic?.startTime ?? (new Date()).toString(), 'yyyy-MM-dd')} - {format(topic?.endTime ?? (new Date()).toString(), 'yyyy-MM-dd')}
          </p>
          <p className="flex items-center"><span className="font-medium mr-2">Học kỳ:</span> {topic?.topicSemester.name}</p>
        </div>
        <div>
          <p className="flex items-center"><span className="font-medium mr-2">Ngành:</span> {topic?.major.name}</p>
          <p className="flex items-center"><span className="font-medium mr-2">Khoa:</span> {topic?.major.department.name}</p>
          <p className="flex items-center"><span className="font-medium mr-2">Nhóm:</span> {topic?.team.groupName}</p>
        </div>
      </div>
    </div>
  );
};
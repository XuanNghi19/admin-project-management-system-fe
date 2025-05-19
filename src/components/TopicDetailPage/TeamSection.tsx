import { MembershipPosition } from "../../types/enum.types";
import { TeamResponse } from "../../types/team.types";

export const TeamSection = ({ team }: { team: TeamResponse | null}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Thông tin nhóm</h2>
      <div className="mb-4">
        <p className="text-gray-700"><span className="font-medium">Giáo viên hướng dẫn:</span> {team?.teacher_name}</p>
        <p className="text-gray-700"><span className="font-medium">Tên nhóm:</span> {team?.groupName}</p>
      </div>
      <h3 className="text-lg font-medium mb-2 text-gray-700">Thành viên:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team?.teamMemberResponseList.map((member) => (
          <div key={member.id} className="flex items-center p-3 border rounded-lg">
            <div className="flex-1">
              <p className="font-medium">{member.student.name}</p>
              <p className="text-sm text-gray-600">{member.student.email}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              member.position === MembershipPosition.LEADER 
                ? "bg-yellow-100 text-yellow-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {member.position === MembershipPosition.LEADER ? "Nhóm trưởng" : "Thành viên"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

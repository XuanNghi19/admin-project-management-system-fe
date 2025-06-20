import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserResponse } from "../types/user.types";
import { CRUDTopicSemester } from "../types/topicSemester.types";
import { CRUDDepartment } from "../types/department.types";
import { CRUDBoardMember } from "../types/boardMember.types";
import {
  searchDepartment,
  searchInstructor,
  searchTopic,
  searchTopicSemester,
} from "../services/lookup.service";
import Select from "react-select";
import { styleSelect } from "../utils/stylesCustom";
import { CRUDDefenseSchedule } from "../types/defenseSchedule.types";
import { format } from "date-fns";
import { TopicResponse } from "../types/topic.types";
import { ActionTypes, ProjectStage } from "../types/enum.types";
import { addCouncil } from "../services/councilManagement.service";

const CreateCouncilPage: React.FC = () => {
  const navigate = useNavigate();

  const [instructorList, setInstructorList] = useState<UserResponse[]>([]);
  const [topicSemesterList, setTopicSemesterList] = useState<
    CRUDTopicSemester[]
  >([]);
  const [topicList, setTopicList] = useState<TopicResponse[]>([]);
  const [departmentList, setDepartmentList] = useState<CRUDDepartment[]>([]);

  const OptionInstructorList = instructorList.map((instructor) => ({
    value: instructor,
    label: instructor.name,
  }));

  const OptionTopicList = topicList.map((topic) => ({
    value: topic,
    label: topic.name,
  }));

  const OptionTopicSemesterList = topicSemesterList.map((topicSemester) => ({
    value: String(topicSemester.id),
    label: topicSemester.name,
  }));

  const OptionDepartmentList = departmentList.map((dpt) => ({
    value: dpt.id,
    label: dpt.name,
  }));

  const [councilName, setCouncilName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [topicSemesterID, setTopicSemesterID] = useState<number | null>(null);
  const [departmentID, setDepartmentID] = useState<number | null>(null);

  const [boardMemberList, setBoarMemberList] = useState<CRUDBoardMember[]>();
  const [defenseScheduleList, setDefenseScheduleList] =
    useState<CRUDDefenseSchedule[]>();

  const [showAddBoardMember, setShowAddBoardMember] = useState(false);
  const [showAddDefenseSchedule, setShowAddDefenseSchedule] = useState(false);

  const [boardMember, setBoardMember] = useState<UserResponse>();
  const [position, setPosition] = useState<string>("");

  const [topic, setTopic] = useState<TopicResponse>();
  const [startTimeTopic, setStartTimeTopic] = useState("");
  const [endTimeTopic, setEndTimeTopic] = useState("");

  const handleAddCouncil = async () => {
    if (
      !startTime ||
      !endTime ||
      topicSemesterID === null ||
      departmentID === null ||
      !councilName ||
      !location || 
      !fileUrl ||
      !boardMemberList
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (new Date(startTime) >= new Date(endTime)) {
      alert("Thời gian bắt đầu phải trước thời gian kết thúc.");
      return;
    }

    const newCreateCouncilRequest = {
      name: councilName,
      fileUrl: "https://firebasestorage.googleapis.com/v0/b/fakeslink-89c91.appspot.com/o/project_management%2FNgh%E1%BB%8B%20%C4%91%E1%BB%8Bnh%20th%C3%A0nh%20l%E1%BA%ADp%20h%E1%BB%99i%20%C4%91%E1%BB%93ng%20s%E1%BB%91%20489.pdf?alt=media",
      location: location,
      startTime: startTime,
      endTime: endTime,
      topicSemesterID: topicSemesterID,
      departmentID: departmentID,
      scheduleRequests: defenseScheduleList || [],
      boardMemberList: boardMemberList || [],
    };

    try {
      // Call the API to create the council
      const res = await addCouncil(newCreateCouncilRequest);
      if (res.code === 200) {
        alert("Tạo hội đồng thành công");
        navigate("/admin/council_management");
      } else {
        alert("Tạo hội đồng thất bại: " + res.message);
      }
    } catch (error) {
      console.error("Error creating council:", error);
      alert("Đã xảy ra lỗi khi tạo hội đồng. Vui lòng thử lại sau.");
    }

  };

  const fetchInstructors = async (name: string | null) => {
    const res = await searchInstructor(name);
    console.log("res", res.result);
    if (res.code === 200 && Array.isArray(res.result)) {
      setInstructorList(res.result);
    }
  };

  const fetchTopics = async (name: string | null) => {
    const res = await searchTopic(name);
    if (res.code === 200 && Array.isArray(res.result)) {
      setTopicList(res.result);
      console.log("TopicList", res.result);
    }
  };

  const fetchTopicSemesters = async (name: string | null) => {
    const res = await searchTopicSemester(name);
    console.log("res", res.result);
    if (res.code === 200 && Array.isArray(res.result)) {
      setTopicSemesterList(res.result);
    }
  };

  const fetchDepartments = async (name: string | null) => {
    const res = await searchDepartment(name);
    console.log("res", res.result);
    if (res.code === 200 && Array.isArray(res.result)) {
      setDepartmentList(res.result);
    }
  };

  const handleAddBoardMember = async () => {
    if (!boardMember || !position) {
      alert("Vui lòng chọn giảng viên và nhập chức vụ.");
      return;
    }

    const newBoardMember: CRUDBoardMember = {
      id: 0,
      user: boardMember,
      position: position,
      action: ActionTypes.CREATE,
    };

    setBoarMemberList((prev) => [...(prev || []), newBoardMember]);
    setShowAddBoardMember(false);
    setBoardMember(undefined);
    setPosition("");
  };

  const handleAddDefenseSchedule = async () => {
    if (!topic || !startTimeTopic || !endTimeTopic) {
      alert("Vui lòng chọn đồ án và nhập thời gian bắt đầu, kết thúc.");
      return;
    }
    const newDefenseSchedule: CRUDDefenseSchedule = {
      id: 0,
      topic: topic,
      startTime: startTimeTopic,
      endTime: endTimeTopic,
      action: ActionTypes.CREATE,
      note: "",
    };
    setDefenseScheduleList((prev) => [...(prev || []), newDefenseSchedule]);
    setShowAddDefenseSchedule(false);
    setTopic(undefined);
    setStartTimeTopic("");
    setEndTimeTopic("");
  }

  useEffect(() => {
    fetchInstructors(null);
    fetchTopics(null);
    fetchTopicSemesters(null);
    fetchDepartments(null);
  }, []);

  const back = () => {
    navigate("/admin/council_management");
  };

  return (
    <div className="h-screen relative flex justify-center bg-gray-50">
      <div className="flex-1 flex flex-col p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <div className="flex relative mb-6">
          <button
            onClick={() => back()}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute start-0"
          >
            Thoát
          </button>
          <div className="flex w-screen justify-center">
            <h1 className="text-2xl font-semibold">Tạo hội đồng</h1>
          </div>
          <button
            onClick={() => handleAddCouncil()}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute end-0"
          >
            Tạo mới hội đồng
          </button>
        </div>
        <div className="bg-white rounded-lg h-fit p-8 mb-4">
          <div className="flex items-center mb-5 gap-5">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Tên hội đồng:</label>
              <input
                type="text"
                value={councilName}
                onChange={(e) => setCouncilName(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Địa điểm */}
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Địa điểm tổ chức:
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center mb-5 gap-5">
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Thời gian hoạt động (bắt đầu):
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border-gray-400 border-1 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:border-1"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Thời gian hoạt động (kết thúc):
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border-gray-400 border-1 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:border-1"
              />
            </div>
          </div>

          <div className="flex items-center mb-5 gap-5">
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Chọn kỳ học đồ án:
              </label>
              <Select
                value={
                  OptionTopicSemesterList.find(
                    (us) => Number(us.value) === topicSemesterID
                  ) ?? null
                }
                options={OptionTopicSemesterList}
                onChange={(selectedOption) =>
                  setTopicSemesterID(Number(selectedOption?.value) ?? null)
                }
                isSearchable
                isClearable
                placeholder="Tìm kỳ học đồ án theo tên"
                styles={styleSelect}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Chọn khoa:</label>
              <Select
                value={
                  OptionDepartmentList.find(
                    (us) => Number(us.value) === departmentID
                  ) ?? null
                }
                options={OptionDepartmentList}
                onChange={(selectedOption) =>
                  setDepartmentID(Number(selectedOption?.value) ?? null)
                }
                isSearchable
                isClearable
                placeholder="Tìm kiếm khoa theo tên"
                styles={styleSelect}
              />
            </div>
          </div>

          <div className="flex items-center mb-3 gap-5">
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Nghị định thành lập hội đồng (File đính kèm):
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFileUrl(URL.createObjectURL(file));
                  }
                }}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg flex h-fit p-8 mt-5 gap-3">
          <div className="flex-1 mb-3 border-1 border-gray-300 p-3 rounded-2xl">
            <div className="flex mb-5 relative items-center mt-3">
              <h3 className="text-lg font-semibold">
                Danh sách thành viên hội đồng
              </h3>
              <button
                onClick={() => setShowAddBoardMember(true)}
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute end-0"
              >
                Thêm thành viên
              </button>
            </div>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">Mã giảng viên</th>
                  <th className="py-2 px-4">Tên</th>
                  <th className="py-2 px-4">Vị trị</th>
                  <th className="py-2 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {boardMemberList?.map((boardMember, idx) => (
                  <tr key={idx} className="cursor-pointer border-t">
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{boardMember.user.idNum}</td>
                    <td className="py-2 px-4">{boardMember.user.name}</td>
                    <td className="py-2 px-4">{boardMember.position}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => {
                          const updatedBoardMember = boardMemberList.filter(
                            (member) => member.user.idNum !== boardMember.user.idNum
                          );
                          setBoarMemberList(updatedBoardMember);
                        }}
                        className="border-blue-900 border-2 hover:bg-red-700 hover:text-white px-4 py-2 rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1 mb-3 border-1 border-gray-300 p-3 rounded-2xl">
            <div className="flex mb-5 relative items-center mt-3">
              <h3 className="text-lg font-semibold">
                Danh sách lịch bảo vệ đồ án
              </h3>
              <button
                onClick={() => setShowAddDefenseSchedule(true)}
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute end-0"
              >
                Thêm lịch bảo vệ đồ án
              </button>
            </div>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">Tên đồ án</th>
                  <th className="py-2 px-4">Bắt đầu</th>
                  <th className="py-2 px-4">Kết thúc</th>
                  <th className="py-2 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {defenseScheduleList?.map((defenseSchedule, idx) => (
                  <tr key={idx} className="cursor-pointer border-t">
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">
                      {defenseSchedule.topic.idNum +
                        "_" +
                        defenseSchedule.topic.name}
                    </td>
                    <td className="py-2 px-4">
                      {format(defenseSchedule.startTime, "yyyy-MM-dd")}
                    </td>
                    <td className="py-2 px-4">
                      {format(defenseSchedule.endTime, "yyyy-MM-dd")}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => {
                          const updateDefenseScheduleList = defenseScheduleList.filter(
                            (ds) => ds.topic.idNum !== defenseSchedule.topic.idNum
                          );
                          setDefenseScheduleList(updateDefenseScheduleList);
                        }}
                        className="border-blue-900 border-2 hover:bg-red-700 hover:text-white px-4 py-2 rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/*popup*/}
      {showAddBoardMember && (
        <div className="fixed inset-0 bg-gray-800/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl space-y-6 shadow-lg">
            <h3 className="text-xl font-semibold text-center text-blue-900">
              Thêm thành viên hội đồng
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Chọn giảng viên hướng dẫn:
                </label>
                <Select
                  value={
                    OptionInstructorList.find(
                      (us) => us.value === boardMember
                    ) ?? null
                  }
                  options={OptionInstructorList}
                  onChange={(selectedOption) =>
                    setBoardMember(selectedOption?.value)
                  }
                  isSearchable
                  isClearable
                  placeholder="Tìm kiếm giảng viên theo tên"
                  styles={styleSelect}
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Chức vụ trong hội đồng:
                </label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập chức vụ"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAddBoardMember(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={() => handleAddBoardMember()}
                className="px-4 py-2 rounded bg-blue-900 hover:bg-blue-950 text-white"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddDefenseSchedule && (
        <div className="fixed inset-0 bg-gray-800/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl space-y-6 shadow-lg">
            <h3 className="text-xl font-semibold text-center text-blue-900">
              Thêm lịch bảo vệ đồ án
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Chọn đồ án:
                </label>
                <Select
                  value={
                    OptionTopicList.find((opt) => opt.value === topic) ?? null
                  }
                  options={OptionTopicList}
                  onChange={(selected) => setTopic(selected?.value)}
                  isSearchable
                  isClearable
                  placeholder="Tìm kiếm đồ án theo tên"
                  styles={styleSelect}
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Thời gian bắt đầu:
                </label>
                <input
                  type="datetime-local"
                  value={startTimeTopic}
                  onChange={(e) => setStartTimeTopic(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Thời gian kết thúc:
                </label>
                <input
                  type="datetime-local"
                  value={endTimeTopic}
                  onChange={(e) => setEndTimeTopic(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAddDefenseSchedule(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={() => handleAddDefenseSchedule()}
                className="px-4 py-2 rounded bg-blue-900 hover:bg-blue-950 text-white"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCouncilPage;

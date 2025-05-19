import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import {
  ClassTopicListByPageResponse,
  ClassTopicResponse,
} from "../types/classTopic.types";
import { CRUDMajor } from "../types/major.types";
import { CRUDTopicSemester } from "../types/topicSemester.types";
import { ApiResponse } from "../types/common.types";
import {
  deleteClassTopic,
  getAllClassTopic,
} from "../services/classTopicManagement.service";
import { searchMajor, searchTopicSemester } from "../services/lookup.service";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const TopicClassroomManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [classTopics, setClassTopics] = useState<ClassTopicResponse[]>([]);
  const [majors, setMajors] = useState<CRUDMajor[]>([]);
  const [topicSemesters, settopicSemesters] = useState<CRUDTopicSemester[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [name, setName] = useState("");
  const [topicSemesterId, setTopicSemesterId] = useState<number | null>(null);
  const [majorId, setMajorId] = useState<number | null>(null);

  const featchTopicSemesters = async (name: string | null) => {
    const res: ApiResponse<CRUDTopicSemester[] | string> =
      await searchTopicSemester(name);
    if (res.code === 200 && typeof res.result !== "string") {
      settopicSemesters(res.result);
    }
  };

  const featchMajor = async (name: string | null) => {
    const res: ApiResponse<CRUDMajor[] | string> = await searchMajor(name);
    if (res.code === 200 && typeof res.result !== "string") {
      setMajors(res.result);
    }
  };

  const featchClassTopics = async (
    name: string | null,
    topicSemesterID: number | null,
    majorID: number | null,
    page: number,
    limit: number = 15
  ) => {
    const res: ApiResponse<ClassTopicListByPageResponse | string> =
      await getAllClassTopic(name, topicSemesterID, majorID, page, limit);
    if (res.code === 200 && typeof res.result !== "string") {
      setClassTopics(res.result.list);
      setTotalPages(res.result.totalPage);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(0);
    featchClassTopics(name, topicSemesterId, majorId, 0);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa lớp học đồ án này?"
    );

    if (confirmDelete) {
      const res: ApiResponse<boolean | string> = await deleteClassTopic(id);
      if (res.code === 200 && res.result === true) {
        alert("Xóa lớp học thành công");
        featchClassTopics(null, null, null, 0);
      } else {
        alert("Xóa lớp học thất bại");
      }
    }
  };

  useEffect(() => {
    featchTopicSemesters(null);
    featchMajor(null);
    featchClassTopics(null, null, null, 0);
  }, [currentPage]);

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <h1 className="text-2xl font-semibold mb-6">Quản lý lớp học đồ án</h1>
        {/* Thanh tìm kiếm */}
        <div className="relative bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tên lớp học"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-96 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
          <select
            value={majorId ?? ""}
            onChange={(e) =>
              setMajorId(e.target.value ? Number(e.target.value) : null)
            }
            className="w-80 border-[0.5px] border-gray-300 rounded px-3 py-2"
          >
            <option value="">Tất cả ngành học</option>
            {majors.map((major) => (
              <option key={major.id} value={major.id ?? ""}>
                {major.name}
              </option>
            ))}
          </select>
          <select
            value={topicSemesterId ?? ""}
            onChange={(e) =>
              setTopicSemesterId(e.target.value ? Number(e.target.value) : null)
            }
            className="w-80 border-[0.5px] border-gray-300 rounded px-3 py-2"
          >
            <option value="">Tất cả kỳ học đồ án</option>
            {topicSemesters.map((ts) => (
              <option key={ts.id} value={ts.id ?? ""}>
                {ts.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-52"
          >
            Tìm kiếm
          </button>
          <button
            onClick={() => navigate(`/admin/create_class_topic`)}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-52 absolute right-3.5"
          >
            Thêm Lớp Học Đồ Án
          </button>
        </div>

        {/* Bảng người dùng */}
        <div className="max-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
              Danh sách lớp học đồ án
            </h2>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">Tên lớp học</th>
                  <th className="py-2 px-4">Giáo viên phụ trách</th>
                  <th className="py-2 px-4">Ngành học</th>
                  <th className="py-2 px-4">Kỳ học đồ án</th>
                  <th className="py-2 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {classTopics.map((classTopic, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      navigate(`/admin/class_topic_detail/${classTopic.id}`)
                    }
                    className="hover:bg-blue-50 cursor-pointer border-t"
                  >
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{classTopic.className}</td>
                    <td className="py-2 px-4">{classTopic.teacher.name}</td>
                    <td className="py-2 px-4">{classTopic.major.name}</td>
                    <td className="py-2 px-4">
                      {classTopic.topicSemester.name}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(classTopic.id);
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

        {/* Phân trang */}
        <Pagination
          pageNo={currentPage}
          totalPages={totalPages}
          setPageNo={setCurrentPage}
          dataTableLength={classTopics.length}
          totalItems={totalPages * 15}
        />
      </div>
    </div>
  );
};

export default TopicClassroomManagementPage;

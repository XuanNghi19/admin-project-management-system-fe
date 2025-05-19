import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { CRUDMajor } from "../types/major.types";
import { CRUDTopicSemester } from "../types/topicSemester.types";
import { ApiResponse } from "../types/common.types";
import { searchMajor, searchTopicSemester } from "../services/lookup.service";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { deleteTopic, getAllTopic } from "../services/topicManagement.service";
import { TopicListByPageResponse, TopicResponse } from "../types/topic.types";
import { ProjectStage, ProjectStageOptions } from "../types/enum.types";

const TopicManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [majors, setMajors] = useState<CRUDMajor[]>([]);
  const [topicSemesters, settopicSemesters] = useState<CRUDTopicSemester[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [name, setName] = useState("");
  const [topicSemesterId, setTopicSemesterId] = useState<number | null>(null);
  const [majorId, setMajorId] = useState<number | null>(null);
  const [projectStage, setProjectStage] = useState<ProjectStage | null>(null);

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

  const featchAllTopic = async (
    name: string | null,
    topicSemesterID: number | null,
    majorID: number | null,
    projectStage: ProjectStage | null,
    page: number,
    limit: number = 15
  ) => {
    try {
      console.log("project stage: " + projectStage);
      const res: ApiResponse<TopicListByPageResponse | string> =
        await getAllTopic(
          name,
          topicSemesterID,
          majorID,
          projectStage,
          page,
          limit
        );
      if (res.code === 200 && typeof res.result !== "string") {
        setTopics(res.result.list);
        setTotalPages(res.result.totalPage);
      } else if(res.code === 200 && typeof res.result === "string") {
        console.log("res.result === string");
        alert("Lỗi tìm kiếm: " + res.result);
      }
    } catch (error) {
      console.log("error");
      alert("Có lỗi: " + error);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(0);
    featchAllTopic(name, topicSemesterId, majorId, projectStage, 0);
  };

  const handleDelete = async (idNum: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa đồ án này?"
    );

    if (confirmDelete) {
      const res: ApiResponse<boolean | string> = await deleteTopic(idNum);
      if (res.code === 200 && res.result === true) {
        alert("Xóa đồ án thành công");
        featchAllTopic(null, null, null, null, 0);
      } else {
        alert("Xóa đồ án thất bại");
      }
    }
  };

  useEffect(() => {
    featchTopicSemesters(null);
    featchMajor(null);
    featchAllTopic(null, null, null, null, 0);
  }, [currentPage]);

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <h1 className="text-2xl font-semibold mb-6">Quản lý đồ án</h1>
        {/* Thanh tìm kiếm */}
        <div className="relative bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tên đồ án"
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
          <select
            value={projectStage ?? ""}
            onChange={(e) =>
              setProjectStage(
                e.target.value ? (e.target.value as ProjectStage) : null
              )
            }
            className="w-80 border-[0.5px] border-gray-300 rounded px-3 py-2"
          >
            <option value="">Tất cả giai đoạn đồ án</option>
            {ProjectStageOptions.map((ps) => (
              <option key={ps.value} value={ps.value ?? ""}>
                {ps.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-52 absolute right-3.5"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Bảng người dùng */}
        <div className="max-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách đồ án</h2>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">Tên đồ án</th>
                  <th className="py-2 px-4">Ngành học</th>
                  <th className="py-2 px-4">Giai đoạn đồ án</th>
                  <th className="py-2 px-4">Kỳ học đồ án</th>
                  <th className="py-2 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      navigate(`/admin/topic_detail/${topic.idNum}`)
                    }
                    className="hover:bg-blue-50 cursor-pointer border-t"
                  >
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{topic.name}</td>
                    <td className="py-2 px-4">{topic.major.name}</td>
                    <td className="py-2 px-4">
                      {
                        ProjectStageOptions.find(
                          (ps) => ps.value === topic.projectStage
                        )?.label ?? "Không xác định"
                      }
                    </td>
                    <td className="py-2 px-4">{topic.topicSemester.name}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(topic.idNum);
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
          dataTableLength={topics.length}
          totalItems={totalPages * 15}
        />
      </div>
    </div>
  );
};

export default TopicManagementPage;

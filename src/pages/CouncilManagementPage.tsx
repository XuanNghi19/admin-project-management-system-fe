import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import {
  CouncilListByPageResponse,
  CouncilResponse,
} from "../types/council.types";
import { CRUDMajor } from "../types/major.types";
import { CRUDTopicSemester } from "../types/topicSemester.types";
import { ApiResponse } from "../types/common.types";
import { searchMajor, searchTopicSemester } from "../services/lookup.service";
import {
  deleteCouncil,
  getAllCouncil,
} from "../services/councilManagement.service";
import Pagination from "../components/Pagination";
import { format } from "date-fns";

const CouncilManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [councilList, setCouncilList] = useState<CouncilResponse[]>([]);
  const [topicSemesters, settopicSemesters] = useState<CRUDTopicSemester[]>([]);
  const [majors, setMajors] = useState<CRUDMajor[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [name, setName] = useState("");
  const [topicSemesterId, setTopicSemesterId] = useState<number | null>(null);
  const [majorId, setMajorId] = useState<number | null>(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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

  const featchCouncils = async (
    name: string | null,
    topicSemesterID: number | null,
    majorID: number | null,
    startTime: string | null,
    endTime: string | null,
    page: number,
    limit: number = 15
  ) => {
    const res: ApiResponse<CouncilListByPageResponse | string> =
      await getAllCouncil(
        name,
        topicSemesterID,
        majorID,
        startTime,
        endTime,
        page,
        limit
      );
    if (res.code === 200 && typeof res.result !== "string") {
      console.log("list: ", res.result.list);
      setCouncilList(res.result.list);
      setTotalPages(res.result.totalPage);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(0);
    featchCouncils(name, topicSemesterId, majorId, start, end, 0);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn hội đồng này?");

    if (confirmDelete) {
      const res: ApiResponse<boolean | string> = await deleteCouncil(id);
      if (res.code === 200 && res.result === true) {
        alert("Xóa hội đồng thành công");
        featchCouncils(null, null, null, null, null, 0);
      } else {
        alert("Xóa hội đồng thất bại");
      }
    }
  };

  useEffect(() => {
    featchTopicSemesters(null);
    featchMajor(null);
    featchCouncils(null, null, null, null, null, 0);
  }, []);

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <div className="flex relative">
          <h1 className="text-2xl font-semibold mb-6">Quản lý hội đồng</h1>
          <button
            onClick={() => navigate(`/admin/create_council`)}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded h-fit w-56 absolute right-0"
          >
            Thêm hội đồng
          </button>
        </div>
        {/* Thanh tìm kiếm */}
        <div className="relative bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tên hội đồng"
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
          <input
            type="datetime-local"
            placeholder="Ngày bắt đầu"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-56 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
          <input
            type="datetime-local"
            placeholder="Ngày kết thúc"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-56 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-52"
          >
            Tìm kiếm
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
                  <th className="py-2 px-4">Tên hội đồng</th>
                  <th className="py-2 px-4">Địa điểm</th>
                  <th className="py-2 px-4">Thời gian hoạt động (Bắt đầu)</th>
                  <th className="py-2 px-4">
                    Thời gian hoạt động (kết thúc đầu)
                  </th>
                  <th className="py-2 px-4">Khoa</th>
                  <th className="py-2 px-4">Kỳ học đồ án</th>
                  <th className="py-2 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {councilList.map((council, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      navigate(`/admin/council_detail/${council.id}`)
                    }
                    className="hover:bg-blue-50 cursor-pointer border-t"
                  >
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{council.name}</td>
                    <td className="py-2 px-4">{council.location}</td>
                    <td className="py-2 px-4">
                      {format(council.startTime, "yyyy-MM-dd")}
                    </td>
                    <td className="py-2 px-4">
                      {format(council.endTime, "yyyy-MM-dd")}
                    </td>
                    <td className="py-2 px-4">{council.department.name}</td>
                    <td className="py-2 px-4">{council.topicSemester.name}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(council.id);
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
          dataTableLength={councilList.length}
          totalItems={totalPages * 15}
        />
      </div>
    </div>
  );
};

export default CouncilManagementPage;

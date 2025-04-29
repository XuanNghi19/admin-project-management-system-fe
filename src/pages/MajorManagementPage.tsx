import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { CRUDMajor, MajorListByPageResponse } from "../types/major.types";
import {
  CRUDDepartment,
  DepartmentListByPageResponse,
} from "../types/department.types";
import { getAllDepartment } from "../services/departmentManagement.service";
import { ApiResponse } from "../types/common.types";
import {
  addMajor,
  getAllMajor,
  updateMajor,
} from "../services/majorManagement.service";
import Pagination from "../components/Pagination";

const MajorManagementPage: React.FC = () => {
  const [departments, setDepartments] = useState<CRUDDepartment[]>([]);
  const [majors, setMajors] = useState<CRUDMajor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);

  const [major, setMajor] = useState<CRUDMajor>({
    id: null,
    name: "",
    progressPercentage: 0,
    reportPercentage: 0,
    defensePercentage: 0,
    reviewPercentage: 0,
    department: {
      id: null,
      name: "",
      description: "",
    },
  });

  const featchDepartment = async (
    name: string | null,
    page: number,
    limit = 15
  ) => {
    const res: ApiResponse<DepartmentListByPageResponse | string> =
      await getAllDepartment(name, page, limit);

    if (res.code === 200 && typeof res.result !== "string") {
      setDepartments(res.result.list);
    }
  };

  const featchMajor = async (
    name: string | null,
    departmentId: number | null,
    page: number,
    limit = 15
  ) => {
    const res: ApiResponse<MajorListByPageResponse | string> =
      await getAllMajor(name, departmentId, page, limit);

    if (res.code === 200 && typeof res.result !== "string") {
      setMajors(res.result.list);
      setTotalPages(res.result.totalPage);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(0);
    featchMajor(name, departmentId !== "" ? Number(departmentId) : null, 0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMajor((prev) => ({
      ...prev,
      [name]: name.endsWith("Percentage") ? Number(value) : value,
      department:
        name === "departmentId"
          ? { ...prev.department, id: Number(value) }
          : prev.department,
    }));
  };

  const handleAddMajor = async () => {
    // Validate required fields
    if (!major.name) {
      alert("Tên ngành học là bắt buộc!");
      return;
    }

    if (!major.department.id) {
      alert("Bắt buộc phải chọn khoa!");
      return;
    }

    try {
      const response = await addMajor([major]);
      if (response.code === 200) {
        alert("Thêm ngành học thành công!");
        setShowAddPopup(false);
        window.location.reload();
      } else {
        alert("Thêm ngành học thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm ngành học!");
    }
  };

  useEffect(() => {
    featchDepartment(null, currentPage);
    featchMajor(name, null, 0);
  }, [currentPage]);

  const showEditMajor = (major: CRUDMajor) => {
    setMajor(major);
    setShowEditPopup(true);
  };

  const handelUpdateMajor = async () => {
    // Validate required fields
    if (!major.name) {
      alert("Tên ngành học là bắt buộc!");
      return;
    }

    try {
      const response = await updateMajor(major);
      if (response.code === 200) {
        alert("Cập nhật ngành học thành công!");
        setShowEditPopup(false);
        window.location.reload();
      } else {
        alert("Cập nhật ngành học thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật ngành học!");
    }
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <h1 className="text-2xl font-semibold mb-6">Quản lý ngành học</h1>
        {/* Thanh tìm kiếm */}
        <div className="relative bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tên khoa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-96 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            className="w-80 border-[0.5px] border-gray-300 rounded px-3 py-2"
          >
            <option value="">Tất cả khoa</option>
            {departments.map((dpt) => (
              <option key={dpt.id} value={dpt.id ?? ""}>
                {dpt.name}
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
            onClick={() => setShowAddPopup(true)}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-52 absolute right-3.5"
          >
            Thêm khoa mới
          </button>
        </div>

        {/* Bảng người dùng */}
        <div className="max-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách ngành học</h2>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Tên ngành học</th>
                  <th className="py-2 px-4">Khoa</th>
                </tr>
              </thead>
              <tbody>
                {majors.map((major, idx) => (
                  <tr
                    key={idx}
                    onClick={() => showEditMajor(major)}
                    className="hover:bg-blue-50 cursor-pointer border-t"
                  >
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{major.id}</td>
                    <td className="py-2 px-4">{major.name}</td>
                    <td className="py-2 px-4">{major.department.name}</td>
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
          dataTableLength={departments.length}
          totalItems={totalPages * 15}
        />
      </div>
      {/* Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] space-y-4">
            <h2 className="text-xl font-bold mb-4">Thêm ngành học mới</h2>

            <div className="space-y-4">
              <input
                name="name"
                value={major.name}
                onChange={handleInputChange}
                placeholder="Tên khoa"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="progressPercentage"
                onChange={handleInputChange}
                placeholder="Phần trăm điểm tiến trình"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="reportPercentage"
                onChange={handleInputChange}
                placeholder="Phần trăm điểm báo cáo"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="reviewPercentage"
                onChange={handleInputChange}
                placeholder="Phần trăm đánh giá"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="defensePercentage"
                onChange={handleInputChange}
                placeholder="Phần trăm điểm bảo vệ"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <select
                name="departmentId"
                value={major.department.id ?? ""}
                onChange={handleInputChange}
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              >
                <option value="">Chọn khoa</option>
                {departments.map((dpt) => (
                  <option key={dpt.id} value={dpt.id ?? ""}>
                    {dpt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddMajor}
                className="px-4 py-2 bg-blue-900 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] space-y-4">
            <h2 className="text-xl font-bold mb-4">Thêm khoa mới</h2>

            <div className="space-y-4">
              <input
                name="name"
                value={major.name}
                onChange={handleInputChange}
                placeholder="Tên khoa"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="progressPercentage"
                value={major.progressPercentage}
                onChange={handleInputChange}
                placeholder="Phần trăm điểm tiến trình"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="reportPercentage"
                value={major.reportPercentage}
                onChange={handleInputChange}
                placeholder="Phần trăm điểm báo cáo"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="reviewPercentage"
                value={major.reviewPercentage}
                onChange={handleInputChange}
                placeholder="Phần trăm đánh giá"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="defensePercentage"
                value={major.defensePercentage}
                onChange={handleInputChange}
                placeholder="Phần trăm điểm bảo vệ"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <select
                name="departmentId"
                value={major.department.id ?? ""}
                onChange={handleInputChange}
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              >
                {departments.map((dpt) => (
                  <option key={dpt.id} value={dpt.id ?? ""}>
                    {dpt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowEditPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handelUpdateMajor}
                className="px-4 py-2 bg-blue-900 text-white rounded"
              >
                Sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MajorManagementPage;

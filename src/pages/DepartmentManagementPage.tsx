import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import {
  CRUDDepartment,
  DepartmentListByPageResponse,
} from "../types/department.types";
import {
  addDepartment,
  deleteDepartment,
  getAllDepartment,
  updateDepartment,
} from "../services/departmentManagement.service";
import { ApiResponse } from "../types/common.types";
import Pagination from "../components/Pagination";

const DepartmentManagementPage: React.FC = () => {
  const [departments, setDepartments] = useState<CRUDDepartment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [name, setName] = useState("");

  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);

  const [department, setDepartment] = useState<CRUDDepartment>({
    id: null,
    name: "",
    description: "",
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
      setTotalPages(res.result.totalPage);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(0);
    featchDepartment(name, 0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDepartment = async () => {
    // Validate required fields
    if (!department.name) {
      alert("Tên khoa là bắt buộc!");
      return;
    }

    try {
      const response = await addDepartment([department]);
      if (response.code === 200) {
        alert("Thêm khoa thành công!");
        setShowAddPopup(false);
        window.location.reload();
      } else {
        alert("Thêm khoa thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm khoa!");
    }
  };

  useEffect(() => {
    featchDepartment(null, currentPage);
  }, [currentPage]);

  const showEditDepartment = (dpt: CRUDDepartment) => {
    setDepartment(dpt);
    setShowEditPopup(true);
  };

  const handelUpdateDepartment = async () => {
    // Validate required fields
    if (!department.name) {
      alert("Tên khoa là bắt buộc!");
      return;
    }

    try {
      const response = await updateDepartment(department);
      if (response.code === 200) {
        alert("Cập nhật khoa thành công!");
        setShowEditPopup(false);
        featchDepartment(null, currentPage);
      } else {
        alert("Cập nhật khoa thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật khoa!");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa khoa này?");
    if (confirmDelete) {
      try {
        const response = await deleteDepartment(id);
        if (response.code === 200 && response.result === true) {
          alert("Khoa đã được xóa.");
          setShowEditPopup(false);
          featchDepartment(null, currentPage);
        } else if (response.result === false) {
          alert(response.message);
        } else {
          alert("Xóa khoa thất bại!");
        }
      } catch (error) {
        alert("Đã xảy ra lỗi khi xóa khoa: " + error);
      }
    }
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <h1 className="text-2xl font-semibold mb-6">Quản lý khoa</h1>
        {/* Thanh tìm kiếm */}
        <div className="relative bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tên khoa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-96 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
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
            <h2 className="text-xl font-semibold mb-4">Danh sách khoa</h2>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Tên khoa</th>
                  <th className="py-2 px-4">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dpt, idx) => (
                  <tr
                    key={idx}
                    onClick={() => showEditDepartment(dpt)}
                    className="hover:bg-blue-50 cursor-pointer border-t"
                  >
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{dpt.id}</td>
                    <td className="py-2 px-4">{dpt.name}</td>
                    <td className="py-2 px-4">{dpt.description}</td>
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
            <h2 className="text-xl font-bold mb-4">Thêm khoa mới</h2>

            <div className="space-y-4">
              <input
                name="name"
                value={department.name}
                onChange={handleInputChange}
                placeholder="Tên khoa"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="description"
                value={department.description}
                onChange={handleInputChange}
                placeholder="Mô tả"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddDepartment}
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
                value={department.name}
                onChange={handleInputChange}
                placeholder="Tên khoa"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="description"
                value={department.description}
                onChange={handleInputChange}
                placeholder="Mô tả"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
            </div>

            <div className="flex mt-4 relative">
              <button
                onClick={() => handleDelete(department.id as number)}
                className="px-4 py-2 border-red-500 border text-red-500 rounded"
              >
                Xóa
              </button>
              <div className="flex space-x-2 justify-end absolute right-0">
                <button
                  onClick={() => setShowEditPopup(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  onClick={handelUpdateDepartment}
                  className="px-4 py-2 bg-blue-900 text-white rounded"
                >
                  Sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagementPage;

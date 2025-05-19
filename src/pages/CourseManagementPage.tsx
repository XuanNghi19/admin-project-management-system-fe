import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { CourseListByPageResponse, CRUDCourse } from "../types/course.types";
import { ApiResponse } from "../types/common.types";
import {
  addCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "../services/courseManagement.service";
import Pagination from "../components/Pagination";
import { format } from 'date-fns';

const CourseManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<CRUDCourse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);

  const [course, setCourse] = useState<CRUDCourse>({
    id: 0,
    name: "",
    startTime: "",
    endTime: "",
  });

  const featchCourse = async (
    name: string | null,
    start: string | null,
    end: string | null,
    page: number,
    limit = 15
  ) => {
    const res: ApiResponse<CourseListByPageResponse | string> =
      await getAllCourse(name, start, end, page, limit);

    if (res.code === 200 && typeof res.result !== "string") {
      setCourses(res.result.list);
      setTotalPages(res.result.totalPage);
      console.log(res.result.list);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(0);
    featchCourse(name, start, end, 0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    // Validate required fields
    if (!course.name) {
      alert("Tên khóa học là bắt buộc!");
      return;
    }

    if (!course.startTime) {
      alert("Thiếu thời gian bắt đầu!");
      return;
    }

    if (!course.endTime) {
      alert("Thiếu thời gian kết thúc!");
      return;
    }

    try {
      const response = await addCourse([course]);
      if (response.code === 200) {
        alert("Thêm khóa học thành công!");
        setShowAddPopup(false);
        featchCourse(null, null, null, 0);
      } else {
        alert("Thêm ngành học thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm khóa học!");
    }
  };

  useEffect(() => {
    featchCourse(null, null, null, 0);
  }, [currentPage]);

  const showEdit = (course: CRUDCourse) => {
    setCourse(course);
    setShowEditPopup(true);
  };

  const handelUpdate = async () => {
    // Validate required fields
    if (!course.name) {
      alert("Tên khóa học là bắt buộc!");
      return;
    }

    if (!course.startTime) {
      alert("Thiếu thời gian bắt đầu!");
      return;
    }

    if (!course.endTime) {
      alert("Thiếu thời gian kết thúc!");
      return;
    }

    try {
      const response = await updateCourse(course);
      if (response.code === 200) {
        alert("Cập nhật khóa học thành công!");
        setShowEditPopup(false);
        featchCourse(null, null, null, 0);
      } else {
        alert("Cập nhật khóa học thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật khóa học!");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học này?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteCourse(id);
        if (response.code === 200 && response.result === true) {
          alert("khóa học đã được xóa.");
          setShowEditPopup(false);
          featchCourse(null, null, null, 0);
        } else if (response.result === false) {
          alert(response.message);
        } else {
          alert("Xóa khóa học thất bại!");
        }
      } catch (error) {
        alert("Đã xảy ra lỗi khi xóa khóa học: " + error);
      }
    }
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <h1 className="text-2xl font-semibold mb-6">Quản lý khóa học</h1>

        {/* Thanh tìm kiếm */}
        <div className="relative bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tên khóa học"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-96 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
          <input
            type="datetime-local"
            placeholder="Ngày bắt đầu"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-96 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
          <input
            type="datetime-local"
            placeholder="Ngày kết thúc"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
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
            Thêm khóa học mới
          </button>
        </div>

        {/* Bảng người dùng */}
        <div className="max-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách khóa học</h2>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">Tên khóa học</th>
                  <th className="py-2 px-4">Ngày bắt đầu</th>
                  <th className="py-2 px-4">Ngày kết thúc</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr
                    key={idx}
                    onClick={() => showEdit(course)}
                    className="hover:bg-blue-50 cursor-pointer border-t"
                  >
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{course.name}</td>
                    <td className="py-2 px-4">{format(course.startTime, 'yyyy-MM-dd')}</td>
                    <td className="py-2 px-4">{format(course.endTime, 'yyyy-MM-dd')}</td>
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
          dataTableLength={courses.length}
          totalItems={totalPages * 15}
        />
      </div>
      {/* Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] space-y-4">
            <h2 className="text-xl font-bold mb-4">Thêm khóa học mới</h2>

            <div className="space-y-4">
              <label className="block">
                <input
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Tên khóa học"
                  className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
                />
              </label>

              <label className="block">
                Ngày bắt đầu:
                <input
                  type="datetime-local"
                  name="startTime"
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-1 mt-1"
                />
              </label>
              <label className="block">
                Ngày kết thúc:
                <input
                  type="datetime-local"
                  name="endTime"
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-1 mt-1"
                />
              </label>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
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
            <h2 className="text-xl font-bold mb-4">Sửa khóa học</h2>

            <div className="space-y-4">
              <label className="block">
                <input
                  name="name"
                  value={course.name}
                  onChange={handleInputChange}
                  placeholder="Tên khóa học"
                  className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
                />
              </label>

              <label className="block">
                Ngày bắt đầu:
                <input
                  type="datetime-local"
                  value={course.startTime}
                  name="startTime"
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-1 mt-1"
                />
              </label>
              <label className="block">
                Ngày kết thúc:
                <input
                  type="datetime-local"
                  value={course.endTime}
                  name="endTime"
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-1 mt-1"
                />
              </label>
            </div>

            <div className="flex mt-4 relative">
              <button
                onClick={() => handleDelete(course.id)}
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
                  onClick={handelUpdate}
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

export default CourseManagementPage;

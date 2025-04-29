import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import {
  CreateUserRequest,
  UserListByPageResponse,
  UserResponse,
} from "../types/user.types";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../types/common.types";
import { addStudent, getAllUser } from "../services/userManagement.service";
import { Role } from "../types/enum.types";
import Pagination from "../components/Pagination";
import { CRUDMajor } from "../types/major.types";
import { CRUDCourse } from "../types/course.types";
import { searchCourse, searchMajor } from "../services/lookup.service";

const StudentManagementPage: React.FC = () => {
  const [students, setStudents] = useState<UserResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Trường tìm kiếm
  const [majorId, setMajorId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [majors, setMajors] = useState<CRUDMajor[]>([]);
  const [courses, setCourses] = useState<CRUDCourse[]>([]);
  const [name, setName] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [student, setStudent] = useState<CreateUserRequest>({
    name: "",
    age: 0,
    password: "",
    dob: "",
    cccd: null,
    email: "",
    phoneNumber: null,
    sex: null,
    address: null,
    courseId: null,
    departmentId: 0,
    majorId: 0,
  });

  const navigate = useNavigate();

  // Hàm gọi API để lấy ngành học
  const fetchMajors = async (name: string | null) => {
    const res = await searchMajor(name);
    if (res.code === 200 && Array.isArray(res.result)) {
      setMajors(res.result); // Cập nhật state ngành học
    }
  };

  // Hàm gọi API để lấy khóa học
  const fetchCourses = async (name: string | null) => {
    const res = await searchCourse(name);
    if (res.code === 200 && Array.isArray(res.result)) {
      setCourses(res.result); // Cập nhật state khóa học
    }
  };

  const fetchStudents = async (
    page: number,
    majorId?: string,
    courseId?: string,
    name?: string
  ) => {
    console.log(majorId);
    console.log(courseId);
    const res: ApiResponse<UserListByPageResponse | string> = await getAllUser(
      Role.STUDENT,
      null,
      majorId ? Number(majorId) : null,
      courseId ? Number(courseId) : null,
      name || null,
      page,
      15
    );

    if (res.code === 200 && typeof res.result !== "string") {
      console.log(res.result.list);
      setStudents(res.result.list);
      setTotalPages(res.result.totalPage);
    }
  };

  useEffect(() => {
    fetchMajors(null);
    fetchCourses(null);
    fetchStudents(currentPage, majorId, courseId, name);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchStudents(0, majorId, courseId, name);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    console.log("value: ", value);
    setStudent((prev) => ({
      ...prev,
      [name]: name === "age" || name.endsWith("Id") ? Number(value) || "" : value,
    }));

  };

  const handleAddStudent = async () => {
    // Validate required fields
    if (!student.name) {
      alert("Tên sinh viên là bắt buộc!");
      return;
    }
    if (!student.age) {
      alert("Tuổi là bắt buộc!");
      return;
    }
    if (!student.dob) {
      alert("Ngày sinh là bắt buộc!");
      return;
    }
    if (!student.email) {
      alert("Email là bắt buộc!");
      return;
    }
    if (!student.majorId) {
      alert("Chuyên ngành là bắt buộc!");
      return;
    }
    if (!student.courseId) {
      alert("Khóa học là bắt buộc!");
      return;
    }

    try {
      const response = await addStudent([student]);
      if (response.code === 200) {
        alert("Thêm sinh viên thành công!");
        setShowPopup(false);
        window.location.reload();
      } else {
        alert("Thêm sinh viên thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm sinh viên!");
    }
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <h1 className="text-2xl font-semibold mb-6">Quản lý sinh viên</h1>

        {/* Thanh tìm kiếm */}
        <div className="relative bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tên người dùng"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-96 border-[0.5px] border-gray-300 rounded px-3 py-2"
          />
          <select
            value={majorId}
            onChange={(e) => setMajorId(e.target.value)}
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
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-80 border-[0.5px] border-gray-300 rounded px-3 py-2"
          >
            <option value="">Tất cả khóa học</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
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
            onClick={() => setShowPopup(true)}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-52 absolute right-3.5"
          >
            Thêm sinh viên
          </button>
        </div>

        {/* Bảng sinh viên */}
        <div className="max-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách sinh viên</h2>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">MSSV</th>
                  <th className="py-2 px-4">Tên</th>
                  <th className="py-2 px-4">Tuổi</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Giới tính</th>
                  <th className="py-2 px-4">Chuyên ngành</th>
                  <th className="py-2 px-4">Khóa</th>
                </tr>
              </thead>
              <tbody>
                {students.map((user, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      navigate(`/admin/user_detail`, { state: { user } })
                    }
                    className="hover:bg-blue-50 cursor-pointer border-t"
                  >
                    <td className="py-2 px-4">{user.idNum}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.age}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.sex}</td>
                    <td className="py-2 px-4">{user.major?.name}</td>
                    <td className="py-2 px-4">{user.course?.name}</td>
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
          dataTableLength={students.length}
          totalItems={totalPages * 15}
        />
      </div>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] space-y-4">
            <h2 className="text-xl font-bold mb-4">Thêm sinh viên mới</h2>

            <div className="space-y-4">
              <input
                name="name"
                value={student.name}
                onChange={handleInputChange}
                placeholder="Tên sinh viên"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="age"
                value={student.age != 0 ? student.age : ""}
                onChange={handleInputChange}
                placeholder="Tuổi"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="dob"
                type="date"
                value={student.dob}
                onChange={handleInputChange}
                placeholder="Ngày sinh"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="cccd"
                value={student.cccd ?? ""}
                onChange={handleInputChange}
                placeholder="CCCD"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="email"
                value={student.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="phoneNumber"
                value={student.phoneNumber ?? ""}
                onChange={handleInputChange}
                placeholder="Số điện thoại"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="sex"
                value={student.sex ?? ""}
                onChange={handleInputChange}
                placeholder="Giới tính"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="address"
                value={student.address ?? ""}
                onChange={handleInputChange}
                placeholder="Địa chỉ"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <select
                name="majorId"
                value={student.majorId}
                onChange={handleInputChange}
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              >
                <option value="">Chọn ngành học</option>
                {majors.map((major) => (
                  <option key={major.id} value={major.id ?? ""}>
                    {major.name}
                  </option>
                ))}
              </select>
              <select
                name="courseId"
                value={student.courseId || ""}
                onChange={handleInputChange}
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              >
                <option value="">Chọn khóa học</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddStudent}
                className="px-4 py-2 bg-blue-900 text-white rounded"
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

export default StudentManagementPage;

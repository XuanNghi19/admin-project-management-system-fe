import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import {
  CreateUserRequest,
  UserListByPageResponse,
  UserResponse,
} from "../types/user.types";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../types/common.types";
import { addAdmin, getAllUser } from "../services/userManagement.service";
import { Role } from "../types/enum.types";
import Pagination from "../components/Pagination";
import { searchDepartment } from "../services/lookup.service";
import { CRUDDepartment } from "../types/department.types";

const AdminManagementPage: React.FC = () => {
  const [students, setStudents] = useState<UserResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Trường tìm kiếm
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState<CRUDDepartment[]>([]);
  const [name, setName] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState<CreateUserRequest>({
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

  // Hàm gọi API để lấy khoa
  const featchDepartment = async (name: string | null) => {
    const res = await searchDepartment(name);
    if (res.code === 200 && Array.isArray(res.result)) {
      setDepartments(res.result); // Cập nhật state khoa
    }
  };

  const fetchUser = async (
    page: number,
    departmentId?: string,
    name?: string
  ) => {
    const res: ApiResponse<UserListByPageResponse | string> = await getAllUser(
      Role.ADMIN,
      departmentId ? Number(departmentId) : null,
      null,
      null,
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
    featchDepartment(null);
    fetchUser(currentPage, departmentId, name);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchUser(0, departmentId, name);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]:
        name === "age" || name.endsWith("Id") ? Number(value) || "" : value,
    }));
  };

  const handleAddAdmin = async () => {
    // Validate required fields
    if (!user.name) {
      alert("Tên quản trị viên là bắt buộc!");
      return;
    }
    if (!user.age) {
      alert("Tuổi là bắt buộc!");
      return;
    }
    if (!user.dob) {
      alert("Ngày sinh là bắt buộc!");
      return;
    }
    if (!user.email) {
      alert("Email là bắt buộc!");
      return;
    }
    if (!user.departmentId) {
      alert("Chọn Khoa là bắt buộc!");
      return;
    }

    try {
      const response = await addAdmin(user);
      if (response.code === 200) {
        alert("Thêm quản trị viên thành công!");
        setShowPopup(false);
        window.location.reload();
      } else {
        alert("Thêm quản trị viên thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm quản trị viên!");
    }
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        {/* Tiêu đề trang */}
        <h1 className="text-2xl font-semibold mb-6">Quản lý quản trị viên</h1>

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
            onClick={() => setShowPopup(true)}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-52 absolute right-3.5"
          >
            Thêm quản trị viên
          </button>
        </div>

        {/* Bảng người dùng */}
        <div className="max-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
              Danh sách quản trị viên
            </h2>
            <table className="min-w-full bg-white text-md">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="py-2 px-4">MSSV</th>
                  <th className="py-2 px-4">Tên</th>
                  <th className="py-2 px-4">Tuổi</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Giới tính</th>
                  <th className="py-2 px-4">khoa</th>
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
                    <td className="py-2 px-4">{user.department?.name}</td>
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
            <h2 className="text-xl font-bold mb-4">Thêm quản trị viên mới</h2>

            <div className="space-y-4">
              <input
                name="name"
                value={user.name}
                onChange={handleInputChange}
                placeholder="Tên quản trị viên"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="age"
                value={user.age != 0 ? user.age : ""}
                onChange={handleInputChange}
                placeholder="Tuổi"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="dob"
                type="date"
                value={user.dob}
                onChange={handleInputChange}
                placeholder="Ngày sinh"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="cccd"
                value={user.cccd ?? ""}
                onChange={handleInputChange}
                placeholder="CCCD"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="phoneNumber"
                value={user.phoneNumber ?? ""}
                onChange={handleInputChange}
                placeholder="Số điện thoại"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="sex"
                value={user.sex ?? ""}
                onChange={handleInputChange}
                placeholder="Giới tính"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <input
                name="address"
                value={user.address ?? ""}
                onChange={handleInputChange}
                placeholder="Địa chỉ"
                className="border-gray-400 border-[1.5px] rounded-md p-2 w-full"
              />
              <select
                name="departmentId"
                value={user.departmentId}
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
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddAdmin}
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

export default AdminManagementPage;

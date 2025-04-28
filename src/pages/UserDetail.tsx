import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../types/locationState";
import React, { useEffect, useState } from "react";
import {
  changePassword,
  deleteUser,
  updateUser,
  uploadAvatar,
} from "../services/userManagement.service";
import { UpdateUserRequest } from "../types/user.types";
import {
  searchCourse,
  searchDepartment,
  searchMajor,
} from "../services/lookup.service";

const UserDetailPage: React.FC = () => {
  const location = useLocation();

  // Ép kiểu location.state
  const state = location.state as LocationState | undefined;
  const user = state?.user;

  const [majors, setMajors] = useState<any[]>([]); // List of majors
  const [courses, setCourses] = useState<any[]>([]); // List of courses
  const [departments, setDepartment] = useState<any[]>([]); // List of departments

  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");

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

  const featchDepartment = async (name: string | null) => {
    const res = await searchDepartment(name);
    if (res.code === 200 && Array.isArray(res.result)) {
      setDepartment(res.result);
    }
  };

  useEffect(() => {
    fetchMajors(null);
    fetchCourses(null);
    featchDepartment(null);
  }, []);

  if (!user) {
    return <div>Không tìm thấy thông tin người dùng</div>;
  }

  const [formData, setFormData] = useState<UpdateUserRequest>({
    idNum: user.idNum,
    name: user.name,
    age: user.age,
    dob: user.dob,
    cccd: user.cccd,
    email: user.email,
    phoneNumber: user.phoneNumber,
    sex: user.sex,
    address: user.address,
    courseId: user.course?.id,
    departmentId: user.department?.id,
    majorId: user.major?.id,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await updateUser(formData);
      if (response.code === 200) {
        alert("Cập nhật thành công!");
        navigate(-1); // Quay về trang trước
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi cập nhật người dùng.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (idNum: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteUser(idNum);
        if (response.code === 200) {
          alert("Người dùng đã được xóa.");
          navigate(-1);
        } else {
          alert("Xóa người dùng thất bại!");
        }
      } catch (error) {
        setErrorMessage("Đã xảy ra lỗi khi xóa người dùng.");
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file)); // Hiện preview
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedAvatar) return;

    try {
      const response = await uploadAvatar(formData.idNum, [selectedAvatar]);
      if (response.code === 200) {
        alert("Cập nhật ảnh thành công!");
      } else {
        alert("Cập nhật ảnh thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật ảnh!");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      alert("Vui lòng nhập mật khẩu mới.");
      return;
    }

    try {
      const res = await changePassword(formData.idNum, newPassword);
      if (res.code === 200) {
        alert("Đổi mật khẩu thành công!");
        setNewPassword(""); // Reset ô nhập mật khẩu
      } else {
        alert("Đổi mật khẩu thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi đổi mật khẩu.");
    }
  };

  return (
    <div className="h-screen flex justify-center bg-gray-50">
      <form
        onSubmit={handleUpdate}
        className="p-6 w-[800px] h-[550px] mt-32 bg-white rounded-lg shadow-md"
      >
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <div className="flex relative items-center space-x-6">
          {/* Input file ẩn */}
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden" // ẩn input
          />

          {/* Ảnh, click vào thì tự động trigger input file */}
          <img
            className="h-24 w-24 rounded-full object-cover border-2 border-violet-500 cursor-pointer"
            src={previewAvatar || user.avatarUrl || "/default-avatar.png"}
            alt="Avatar"
            onClick={() => document.getElementById("avatarInput")?.click()} // trigger input file
          />
          <button
            type="button"
            onClick={handleUploadAvatar}
            className="absolute right-0 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-950"
          >
            Cập nhật Avatar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="space-y-2">
            <label className="block">
              MSSV:
              <input
                type="text"
                name="idNum"
                value={formData.idNum}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1 mt-1"
                readOnly
              />
            </label>
            <label className="block">
              Ngày sinh:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1 mt-1"
              />
            </label>
            <label className="block">
              Giới tính:
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1 mt-1"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </label>
            <label className="block">
              CCCD:
              <input
                type="text"
                name="cccd"
                value={formData.cccd}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1 mt-1"
              />
            </label>
          </div>

          <div className="space-y-2">
            {user.course !== null ? (
              <>
                {/* Chuyên ngành */}
                <label className="block">
                  Chuyên ngành:
                  <select
                    name="majorId"
                    value={formData.majorId ?? ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-1 mt-1"
                  >
                    {majors.map((major) => (
                      <option key={major.id} value={major.id}>
                        {major.name}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Khóa học */}
                <label className="block">
                  Khóa học:
                  <select
                    name="courseId"
                    value={formData.courseId ?? ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-1 mt-1"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Khoa - disabled */}
                <label className="block">
                  Khoa:
                  <select
                    name="departmentId"
                    value={formData.departmentId ?? user.major?.department.id}
                    disabled
                    className="w-full border rounded px-3 py-1 mt-1"
                  >
                    {/* Cần có danh sách departments */}
                    {departments.map((dpt) => (
                      <option key={dpt.id} value={dpt.id}>
                        {dpt.name}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            ) : (
              <>
                {/* Chỉ hiện mỗi Khoa nếu course là null */}
                <label className="block">
                  Khoa:
                  <select
                    name="departmentId"
                    value={formData.departmentId ?? ""}
                    disabled
                    className="w-full border rounded px-3 py-1 mt-1"
                  >
                    {departments.map((dpt) => (
                      <option key={dpt.id} value={dpt.id}>
                        {dpt.name}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
          </div>
        </div>

        <div className="text-right pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-950"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
          <button
            type="button"
            onClick={() => handleDelete(formData.idNum)}
            className="ml-4 px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-950"
          >
            Xóa người dùng
          </button>
          <div className="flex items-center space-x-2 mt-6">
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded px-3 py-1 flex-1"
            />
            <button
              type="button"
              onClick={handleChangePassword}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-950"
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetailPage;

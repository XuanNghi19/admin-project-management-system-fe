import { Link, useLocation, useNavigate } from "react-router-dom";
import menu from "../../public/menu.png";
import { useState, useEffect } from "react";

const Menu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true); // mặc định mở
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isCurriculumManagementOpen, setIsCurriculumManagementOpen] =
    useState(false);

  useEffect(() => {
    // Lấy trạng thái menu từ localStorage nếu có
    const savedState = localStorage.getItem("menuIsOpen");
    if (savedState !== null) {
      setIsOpen(savedState !== "true");
    }
  }, []);

  useEffect(() => {
    // Khi isOpen thay đổi thì lưu vào localStorage
    localStorage.setItem("menuIsOpen", isOpen.toString());
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // xóa token
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center gap-2.5 z-50">
        {/* Menu chính */}
        {isOpen && (
          <div className="w-96 text-white left-2 top-2 bottom-2 absolute flex flex-col bg-blue-900 rounded-2xl transition-all duration-300">
            <div className="flex relative flex-col items-center justify-center gap-4 mt-10">
              <h1 className="text-3xl font-semibold">Project management</h1>
              <div className="flex flex-col gap-2 mt-10 w-full overflow-y-auto h-[690px] scrollbar-hide">
                <ul className="flex flex-col w-full">
                  <li
                    className={`w-full h-[60px] text-xl flex items-center font-normal hover:bg-blue-950 ${
                      location.pathname === "/admin/dashboard"
                        ? "bg-blue-950"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin/dashboard"
                      className="ml-12 w-full h-full flex items-center"
                    >
                      Tổng quan
                    </Link>
                  </li>

                  {/* Quản lý người dùng */}
                  <li
                    className={`w-full h-[60px] text-xl flex items-center font-normal hover:bg-blue-950 cursor-pointer ${
                      isUserManagementOpen ? "bg-blue-950" : ""
                    }
                  ${
                    location.pathname.startsWith("/admin/user_management")
                      ? "bg-blue-950"
                      : ""
                  }
                  `}
                    onClick={() =>
                      setIsUserManagementOpen(!isUserManagementOpen)
                    }
                  >
                    <div className="ml-12 w-full h-full flex items-center">
                      Quản lý người dùng
                    </div>
                  </li>

                  {/* Nếu menu người dùng được mở, hiển thị các mục con */}
                  {isUserManagementOpen && (
                    <ul className="pl-8">
                      <li
                        className={`w-full h-[60px] text-xl flex items-center font-normal pl-10 hover:bg-blue-950 ${
                          location.pathname ===
                          "/admin/user_management/student_management"
                            ? "bg-blue-950"
                            : ""
                        }`}
                      >
                        <Link
                          to="/admin/user_management/student_management"
                          className="w-full h-full flex items-center"
                        >
                          Quản lý sinh viên
                        </Link>
                      </li>
                      <li
                        className={`w-full h-[60px] text-xl flex items-center font-normal pl-10 hover:bg-blue-950 ${
                          location.pathname ===
                          "/admin/user_management/teacher_management"
                            ? "bg-blue-950"
                            : ""
                        }`}
                      >
                        <Link
                          to="/admin/user_management/teacher_management"
                          className="w-full h-full flex items-center"
                        >
                          Quản lý giảng viên
                        </Link>
                      </li>
                      <li
                        className={`w-full h-[60px] text-xl flex items-center font-normal pl-10 hover:bg-blue-950 ${
                          location.pathname ===
                          "/admin/user_management/admin_management"
                            ? "bg-blue-950"
                            : ""
                        }`}
                      >
                        <Link
                          to="/admin/user_management/admin_management"
                          className="w-full h-full flex items-center"
                        >
                          Quản lý quản trị viên
                        </Link>
                      </li>
                    </ul>
                  )}

                  {/* Quản lý chương trình đào tạo */}
                  <li
                    className={`w-full h-[60px] text-xl flex items-center font-normal hover:bg-blue-950 cursor-pointer ${
                      isCurriculumManagementOpen ? "bg-blue-950" : ""
                    }
                  ${
                    location.pathname.startsWith("/admin/curriculum_management")
                      ? "bg-blue-950"
                      : ""
                  }
                  `}
                    onClick={() =>
                      setIsCurriculumManagementOpen(!isCurriculumManagementOpen)
                    }
                  >
                    <div className="ml-12 w-full h-full flex items-center">
                      Quản lý chương trình đào tạo
                    </div>
                  </li>

                  {isCurriculumManagementOpen && (
                    <ul className="pl-8">
                      <li
                        className={`w-full h-[60px] text-xl flex items-center font-normal pl-10 hover:bg-blue-950 ${
                          location.pathname ===
                          "/admin/curriculum_management/department_management"
                            ? "bg-blue-950"
                            : ""
                        }`}
                      >
                        <Link
                          to="/admin/curriculum_management/department_management"
                          className="w-full h-full flex items-center"
                        >
                          Quản lý khoa
                        </Link>
                      </li>
                      <li
                        className={`w-full h-[60px] text-xl flex items-center font-normal pl-10 hover:bg-blue-950 ${
                          location.pathname ===
                          "/admin/curriculum_management/major_management"
                            ? "bg-blue-950"
                            : ""
                        }`}
                      >
                        <Link
                          to="/admin/curriculum_management/major_management"
                          className="w-full h-full flex items-center"
                        >
                          Quản lý ngành học
                        </Link>
                      </li>
                      <li
                        className={`w-full h-[60px] text-xl flex items-center font-normal pl-10 hover:bg-blue-950 ${
                          location.pathname ===
                          "/admin/curriculum_management/course_management"
                            ? "bg-blue-950"
                            : ""
                        }`}
                      >
                        <Link
                          to="/admin/curriculum_management/course_management"
                          className="w-full h-full flex items-center"
                        >
                          Quản lý khóa học
                        </Link>
                      </li>
                      <li
                        className={`w-full h-[60px] text-xl flex items-center font-normal pl-10 hover:bg-blue-950 ${
                          location.pathname ===
                          "/admin/curriculum_management/topic_semester_management"
                            ? "bg-blue-950"
                            : ""
                        }`}
                      >
                        <Link
                          to="/admin/curriculum_management/topic_semester_management"
                          className="w-full h-full flex items-center"
                        >
                          Quản lý kỳ học đồ án
                        </Link>
                      </li>
                    </ul>
                  )}

                  <li
                    className={`w-full h-[60px] text-xl flex items-center font-normal hover:bg-blue-950 ${
                      location.pathname === "/admin/topic_classroom_management"
                        ? "bg-blue-950"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin/topic_classroom_management"
                      className="ml-12 w-full h-full flex items-center"
                    >
                      Quản lý lớp học đồ án
                    </Link>
                  </li>

                  <li
                    className={`w-full h-[60px] text-xl flex items-center font-normal hover:bg-blue-950 ${
                      location.pathname === "/admin/topic_management"
                        ? "bg-blue-950"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin/topic_management"
                      className="ml-12 w-full h-full flex items-center"
                    >
                      Quản lý đồ án
                    </Link>
                  </li>

                  <li
                    className={`w-full h-[60px] text-xl flex items-center font-normal hover:bg-blue-950 ${
                      location.pathname === "/admin/council_management"
                        ? "bg-blue-950"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin/council_management"
                      className="ml-12 w-full h-full flex items-center"
                    >
                      Quản lý hội đồng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Nút đăng xuất */}
            <div
              onClick={handleLogout}
              className="w-full h-[60px] text-xl flex font-normal hover:bg-blue-950 cursor-pointer bottom-4 absolute"
            >
              <div className="ml-12 w-full h-full flex items-center">
                Đăng xuất
              </div>
            </div>
          </div>
        )}

        {/* Nút toggle */}
        <div
          onClick={toggleMenu}
          className={`hover:bg-blue-950 rounded-full w-[50px] h-[50px] bg-blue-900 absolute flex items-center cursor-pointer
            ${isOpen ? "left-[400px] rotate-0" : "left-[5px] rotate-180"}`}
        >
          <img
            src={menu}
            alt="Toggle Menu"
            className="ml-[6px] w-[30px] h-[30px]"
          />
        </div>
      </div>
    </>
  );
};

export default Menu;

// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import StudentManagementPage from "../pages/StudentManagementPage";
import RequireAuth from "./RequireAuth ";
import DashBoardPage from "../pages/DashBoardPage";
import UserDetail from "../pages/UserDetailPage";
import InstructorManagementPage from "../pages/InstructorManagementPage";
import AdminManagementPage from "../pages/AdminManagementPage";
import DepartmentManagementPage from "../pages/DepartmentManagementPage";
import MajorManagementPage from "../pages/MajorManagementPage";
import CourseManagementPage from "../pages/CourseManagementPage";
import TopicSemesterManagementPage from "../pages/TopicSemesterManagement";
import TopicClassroomManagementPage from "../pages/TopicClassroomManagementPage";
import TopicManagementPage from "../pages/TopicManagementPage";
import CouncilManagementPage from "../pages/CouncilManagementPage";
import CreateClassTopicPage from "../pages/CreateTopicClassroomPage";
import ClassTopicDetailPage from "../pages/ClassTopicDetailPage";
import TopicDetailPage from "../pages/TopicDetail";
import CreateCouncilPage from "../pages/CreateCouncilPage";
import CouncilDetail from "../pages/CouncilDetail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      {/* Route cần đăng nhập mới vào được */}
      <Route  element= {<RequireAuth />}>
        <Route path="/admin/dashboard" element={<DashBoardPage />} />

        {/* Quản lý người dùng */}
        <Route path="/admin/user_management/student_management" element={<StudentManagementPage />}/>
        <Route path="/admin/user_management/teacher_management" element={<InstructorManagementPage />}/>
        <Route path="/admin/user_management/admin_management" element={<AdminManagementPage />}/>
        <Route path="/admin/user_detail" element={<UserDetail />} />

        {/* Quản lý chương trình đào tạo */}
        <Route path="/admin/curriculum_management/department_management" element={<DepartmentManagementPage />}/>
        <Route path="/admin/curriculum_management/major_management" element={<MajorManagementPage />}/>
        <Route path="/admin/curriculum_management/course_management" element={<CourseManagementPage />}/>
        <Route path="/admin/curriculum_management/topic_semester_management" element={<TopicSemesterManagementPage />}/>

        {/* Quản lý lớp học đồ án */}
        <Route path="/admin/topic_classroom_management" element={<TopicClassroomManagementPage />}/>
        <Route path="/admin/create_class_topic" element={<CreateClassTopicPage />}/>
        <Route path="/admin/class_topic_detail/:id" element={<ClassTopicDetailPage />}/>

        {/* Quản lý đồ án */}
        <Route path="/admin/topic_management" element={<TopicManagementPage />}/>
        <Route path="/admin/topic_detail/:idNum" element={<TopicDetailPage />}/>

        {/* Quản lý hội đồng */}
        <Route path="/admin/council_management" element={<CouncilManagementPage />}/>
        <Route path="/admin/create_council" element={<CreateCouncilPage />}/>
        <Route path="/admin/council_detail/:id" element={<CouncilDetail />}/>
      </Route>

      {/* 404 fallback */}
      <Route />
    </Routes>
  );
};

export default AppRoutes;

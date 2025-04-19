// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import StudentManagementPage from "../pages/studentManagementPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      {/* Route cần đăng nhập mới vào được */}
      <Route path="/admin">
        <Route path="student_management" element={<StudentManagementPage />}/>
      </Route>

      {/* 404 fallback */}
      <Route />
    </Routes>
  );
};

export default AppRoutes;

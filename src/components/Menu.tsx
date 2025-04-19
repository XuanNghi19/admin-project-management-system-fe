import React from "react";

const Menu: React.FC = () => {
  return (
    <>
      <div className="w-96 h-screen flex flex-col items-center justify-center bg-violet-50 rounded">
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <h1 className="text-3xl font-bold">Quản lý sinh viên</h1>
          <ul className="flex flex-col items-center justify-center gap-4 mt-10">
            <li className="text-xl font-semibold">Danh sách sinh viên</li>
            <li className="text-xl font-semibold">Thêm sinh viên</li>
            <li className="text-xl font-semibold">Cập nhật thông tin sinh viên</li>
            <li className="text-xl font-semibold">Xóa sinh viên</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
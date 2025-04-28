import React from "react";
import Menu from "../components/Menu";

const TopicSemesterManagementPage: React.FC = () => {
  return (
    <div className="bg-gray-50 w-screen h-screen flex relative overflow-hidden">
      <Menu />
      <div className="flex-1 p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <h1 className="text-2xl font-semibold mb-6">Quản lý kỳ học đồ án</h1>
      </div>
    </div>
  );
};

export default TopicSemesterManagementPage;

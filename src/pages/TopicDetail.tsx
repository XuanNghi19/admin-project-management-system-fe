import { useEffect, useState } from "react";

import { TopicHeader } from "../components/TopicDetailPage/TopicHeader";
import { GradeSection } from "../components/TopicDetailPage/GradeSection";
import { TeamSection } from "../components/TopicDetailPage/TeamSection";
import { DefenseSchedule } from "../components/TopicDetailPage/DefenseSchedule";
import { TaskList } from "../components/TopicDetailPage/TaskList";
import { AnnouncementList } from "../components/TopicDetailPage/AnnouncementList";
import { FilesList } from "../components/TopicDetailPage/FilesList";
import { EvaluationList } from "../components/TopicDetailPage/EvaluationList";
import { MeetingList } from "../components/TopicDetailPage/MeetingList";
import { useNavigate, useParams } from "react-router-dom";
import { TopicDetailsResponse } from "../types/topic.types";
import { ApiResponse } from "../types/common.types";
import {
  approveTopicGrade,
  getDetailTopic,
} from "../services/topicManagement.service";

const TopicDetailPage: React.FC = () => {
  const { idNum } = useParams<{ idNum: string }>();

  const [activeTab, setActiveTab] = useState("overview");
  const [topicDetail, setTopicDetail] = useState<TopicDetailsResponse>();

  const navigate = useNavigate();

  const featchDetailTopic = async (idNum: string) => {
    try {
      const res: ApiResponse<TopicDetailsResponse | string> =
        await getDetailTopic(idNum);
      if (res.code === 200 && typeof res.result !== "string") {
        const data = res.result;
        setTopicDetail(data);
      } else if (res.code === 400 && typeof res.result === "string") {
        alert(`Lỗi khi lấy thông tin đồ án: ${res.result}`);
      }
    } catch (error) {
      alert("Đã có lỗi xảy ra: " + error);
      console.error("Đã có lỗi xảy ra: " + error);
    }
  };

  const approveGrade = async () => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn duyệt điểm đồ án này?"
    );
    if (confirm) {
      try {
        const res: ApiResponse<number | string> = await approveTopicGrade(
          String(idNum)
        );
        console.log(res);
        if (res.code === 200 && typeof res.result === "number") {
          if (res.result !== 0) {
            alert("Cập nhật điểm đồ án thành công!");
          } else {
            alert("Cập nhật điểm đồ án không thành công: " + res.message);
          }
        } else if (res.code === 400 && typeof res.result === "string") {
          alert(`Lỗi khi cập nhật điểm đồ án: ${res.result}`);
        }
      } catch (error) {
        alert("Đã có lỗi xảy ra: " + error);
        console.error("Đã có lỗi xảy ra: " + error);
      }
    }
  };

  useEffect(() => {
    featchDetailTopic(String(idNum));
  }, []);

  const back = () => {
    navigate("/admin/topic_management");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 overflow-auto scrollbar-hide">
      <div className="flex relative mb-6">
        <button
          onClick={() => back()}
          className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute start-0"
        >
          Thoát
        </button>
        <div className="items-center justify-center flex w-screen">
          <h1 className="text-2xl font-semibold">Chi tiết đồ án</h1>
        </div>
        <button
          onClick={() => approveGrade()}
          className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute end-0"
        >
          Duyệt điểm
        </button>
      </div>
      <TopicHeader topic={topicDetail ?? null} />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "tasks"
                ? "border-b-2 border-blue-500 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Công việc
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "announcements"
                ? "border-b-2 border-blue-500 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Thông báo
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "files"
                ? "border-b-2 border-blue-500 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Tài liệu
          </button>
          <button
            onClick={() => setActiveTab("evaluations")}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "evaluations"
                ? "border-b-2 border-blue-500 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Đánh giá
          </button>
          <button
            onClick={() => setActiveTab("meetings")}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "meetings"
                ? "border-b-2 border-blue-500 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Lịch họp
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-6 overflow-auto scrollbar-hide">
        {activeTab === "overview" && (
          <>
            <GradeSection
              grade={topicDetail?.grade ?? null}
              major={topicDetail?.major ?? null}
            />
            <TeamSection team={topicDetail?.team ?? null} />
            <DefenseSchedule schedule={topicDetail?.defenseSchedule ?? null} />
          </>
        )}

        {activeTab === "tasks" && (
          <TaskList tasks={topicDetail?.taskList ?? null} />
        )}

        {activeTab === "announcements" && (
          <AnnouncementList
            announcements={topicDetail?.announcementList ?? null}
          />
        )}

        {activeTab === "files" && (
          <FilesList files={topicDetail?.filesUrlList ?? null} />
        )}

        {activeTab === "evaluations" && (
          <EvaluationList evaluations={topicDetail?.evaluationList ?? null} />
        )}

        {activeTab === "meetings" && (
          <MeetingList meetings={topicDetail?.meetingList ?? null} />
        )}
      </div>
    </div>
  );
};

export default TopicDetailPage;

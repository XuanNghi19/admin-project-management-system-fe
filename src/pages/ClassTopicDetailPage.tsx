import React, { useEffect, useState } from "react";
import { CUDStudentTopicRequest } from "../types/studentTopic.types";
import {
  ClassTopicDetailResponse,
  UpdateClassTopicRequest,
} from "../types/classTopic.types";
import {
  getClassTopicDetail,
  updateClassTopic,
} from "../services/classTopicManagement.service";
import Select from "react-select";
import { UserResponse } from "../types/user.types";
import {
  searchInstructor,
  searchMajor,
  searchSingleStudent,
  searchTopicSemester,
} from "../services/lookup.service";
import { styleSelect } from "../utils/stylesCustom";
import { useNavigate, useParams } from "react-router-dom";
import { CRUDMajor } from "../types/major.types";
import { CRUDTopicSemester } from "../types/topicSemester.types";
import * as XLSX from "xlsx";
import mau_excel from "../../public/mau_excel.png";
import { ActionTypes } from "../types/enum.types";
import { ApiResponse } from "../types/common.types";

const ClassTopicDetailPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [instructorList, setInstructorList] = useState<UserResponse[]>([]);
  const [topicSemesterList, setTopicSemesterList] = useState<
    CRUDTopicSemester[]
  >([]);
  const [majorList, setMajorList] = useState<CRUDMajor[]>([]);

  const OptioninstructorList = instructorList.map((instructor) => ({
    value: instructor.idNum,
    label: instructor.name,
  }));

  const OptionTopicSemesterList = topicSemesterList.map((topicSemester) => ({
    value: String(topicSemester.id),
    label: topicSemester.name,
  }));

  const OptionMajorList = majorList.map((major) => ({
    value: major.id,
    label: major.name,
  }));

  const [className, setClassName] = useState("");
  const [teacherIdNum, setTeacherIdNum] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [topicSemesterID, setTopicSemesterID] = useState<number | null>(null);
  const [majorID, setMajorID] = useState<number | null>(null);
  const [students, setStudents] = useState<UserResponse[]>([]);

  const [deleteStudentTopics, setDeleteStudentTopics] = useState<
    CUDStudentTopicRequest[]
  >([]);
  const [addStudentTopics, setAddStudentTopics] = useState<
    CUDStudentTopicRequest[]
  >([]);

  const [showAddSigleStudent, setShowAddSigleStudent] = useState(false);
  const [showAddStudentsWithExcel, setshowAddStudentsWithExcel] =
    useState(false);

  const [idNum, setIdNum] = useState("");

  const [crrStudentTopics, setCrrStudentTopics] = useState<UserResponse[]>([]);

  const handleUpdateClass = async () => {
    if (
      !startTime ||
      !endTime ||
      topicSemesterID === null ||
      majorID === null
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    let studentsChangeBuffer = students.map((student) => {
      const studentAdd: CUDStudentTopicRequest = {
        id: 0,
        studentIdNum: student.idNum,
        status: false,
        action: ActionTypes.UPDATE,
      };
      return studentAdd;
    });

    let studentsChange = [
      ...deleteStudentTopics,
      ...addStudentTopics,
      ...studentsChangeBuffer,
    ];

    const request: UpdateClassTopicRequest = {
      id: Number(id),
      className,
      teacherIdNum,
      majorID,
      startRegistrationTime: new Date(startTime).toISOString(),
      endRegistrationTime: new Date(endTime).toISOString(),
      studentTopicList: studentsChange,
    };

    try {
      const res = await updateClassTopic(request);
      if (res.code === 200 && typeof res.result !== "string") {
        alert("Cập nhật lớp học đồ án thành công");
        back();
      } else if (res.code === 400 && typeof res.result === "string") {
        const parts = res.result.split(": ");
        const message = parts.slice(1).join(": ");
        alert(`Cập nhật thất bại: ${message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi cập nhật lớp học.");
    }
  };

  const fetchInstructors = async (name: string | null) => {
    const res = await searchInstructor(name);
    console.log("res", res.result);
    if (res.code === 200 && Array.isArray(res.result)) {
      setInstructorList(res.result);
    }
  };

  const fetchTopicSemesters = async (name: string | null) => {
    const res = await searchTopicSemester(name);
    console.log("res", res.result);
    if (res.code === 200 && Array.isArray(res.result)) {
      setTopicSemesterList(res.result);
    }
  };

  const fetchMajors = async (name: string | null) => {
    const res = await searchMajor(name);
    console.log("res", res.result);
    if (res.code === 200 && Array.isArray(res.result)) {
      setMajorList(res.result);
    }
  };

  const fetchClassTopicDetail = async (id: number) => {
    try {
      const res: ApiResponse<ClassTopicDetailResponse | string> =
        await getClassTopicDetail(id);
      if (res.code === 200 && typeof res.result !== "string") {
        const data = res.result;
        setClassName(data.className);
        setTeacherIdNum(data.teacher.idNum);
        setStartTime(data.startRegistrationTime);
        setEndTime(data.endRegistrationTime);
        setMajorID(data.major.id);
        setTopicSemesterID(data.topicSemester.id);
        let studentList = data.studentTopicList.map((studentTopic) => {
          return studentTopic.student;
        });
        setStudents([...studentList]);

        setCrrStudentTopics([...studentList]);
      } else if (res.code === 400 && typeof res.result === "string") {
        alert(`Lỗi khi lấy thông tin lớp học đồ án: ${res.result}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Lỗi khi lấy thông tin lớp học đồ án: ${error}`);
    }
  };

  useEffect(() => {
    fetchInstructors(null);
    fetchTopicSemesters(null);
    fetchMajors(null);
    console.log("id class_topic_detail:", Number(id?.trim()));
    fetchClassTopicDetail(Number(id));
  }, []);

  const back = () => {
    navigate("/admin/topic_classroom_management");
  };

  const fetchSingleStudent = async (idNum: string | null) => {
    if (!idNum) {
      alert("Vui lòng nhập MSSV");
      return;
    }

    const existingStudent = students.find(
      (student) => student.idNum.toLowerCase() === idNum.toLowerCase()
    );
    if (existingStudent) {
      alert("Sinh viên đã tồn tại trong danh sách.");
      return;
    }

    const res = await searchSingleStudent(idNum);
    if (res.code === 200 && typeof res.result !== "string") {
      setStudents([res.result, ...students]);
      const newCUDStudentTopic: CUDStudentTopicRequest = {
        action: ActionTypes.CREATE,
        id: 0,
        studentIdNum: res.result.idNum,
        status: false,
      };
      setAddStudentTopics([newCUDStudentTopic, ...addStudentTopics]);
    } else if (res.code === 400 && typeof res.result === "string") {
      alert(`Có lỗi: ${res.result}`);
    }
    setShowAddSigleStudent(false);
    setIdNum("");
  };

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("Vui lòng chọn tệp Excel.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const arrayBuffer = evt.target?.result as ArrayBuffer;
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const data = XLSX.utils.sheet_to_json(ws);
      console.log("Danh sách sinh viên từ Excel:", data);

      let addStudents: UserResponse[] = [];
      let newStudentTopicList: CUDStudentTopicRequest[] = [];

      data.forEach((student: any) => {
        const existingStudent = students.find(
          (s) => s.idNum.toLowerCase() == student["MSSV"].toLowerCase()
        );
        if (!existingStudent) {
          const newStudent: UserResponse = {
            idNum: student["MSSV"],
            name: student["Tên"],
            age: student["Tuổi"],
            dob: "", // chưa có trong file => để rỗng hoặc tự sinh
            cccd: "", // chưa có trong file => để rỗng
            email: student["Email"],
            phoneNumber: "", // chưa có => để rỗng
            sex: student["Giới tính"],
            avatarUrl: "", // mặc định nếu chưa có
            address: "", // mặc định nếu chưa có
            course: {
              id: 0,
              name: student["Khóa"], // chưa có trong file => để rỗng
              startTime: "",
              endTime: "",
            },
            major: {
              id: 0,
              name: student["Chuyên ngành"], // chưa có trong file => để rỗng
              progressPercentage: 0,
              reportPercentage: 0,
              defensePercentage: 0,
              reviewPercentage: 0,
              department: {
                id: 0,
                name: "", // chưa có trong file => để rỗng
                description: "",
              },
            },
            department: {
              id: 0,
              name: "", // chưa có trong file => để rỗng
              description: "",
            },
          };
          addStudents.push(newStudent);
          const newCUDStudentTopic: CUDStudentTopicRequest = {
            action: ActionTypes.CREATE,
            id: 0,
            studentIdNum: student["MSSV"],
            status: false,
          };

          newStudentTopicList.push(newCUDStudentTopic);
        }
      });

      addStudents = [...addStudents, ...students];
      setStudents(addStudents);

      newStudentTopicList = [...newStudentTopicList, ...addStudentTopics];
      setAddStudentTopics(newStudentTopicList);
    };

    reader.readAsArrayBuffer(file);
    setshowAddStudentsWithExcel(false);
  };

  const deleteStudentTopic = (user: UserResponse) => {
    const updatedStudents = students.filter(
      (student) => student.idNum !== user.idNum
    );
    setStudents(updatedStudents);

    console.log("cc: ", crrStudentTopics);
    const exit = crrStudentTopics.find(
      (student) => student.idNum.toLowerCase() === user.idNum.toLowerCase()
    );

    if (exit) {
      const newCUDStudentTopic: CUDStudentTopicRequest = {
        action: ActionTypes.DELETE,
        id: 0,
        studentIdNum: user.idNum,
        status: false,
      };
      deleteStudentTopics.push(newCUDStudentTopic);
    }

    console.log("deleteStudentTopics: ", deleteStudentTopics);
  };

  return (
    <div className="h-screen relative flex justify-center bg-gray-50">
      <div className="flex-1 flex flex-col p-6 ml-[40px] mr-[30px] overflow-auto scrollbar-hide">
        <div className="flex relative mb-6">
          <h1 className="text-2xl font-semibold">Chi tiết lớp học đồ án</h1>
          <button
            onClick={() => back()}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute end-0"
          >
            Thoát
          </button>
        </div>
        <div className="bg-white rounded-lg h-fit p-8 mb-4">
          <div className="flex items-center mb-5 gap-5">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Tên lớp học:</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full border-gray-400 border-1 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:border-1"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Chọn giảng viên hướng dẫn:
              </label>
              <Select
                value={
                  OptioninstructorList.find(
                    (us) => us.value === teacherIdNum
                  ) ?? null
                }
                options={OptioninstructorList}
                onChange={(selectedOption) =>
                  setTeacherIdNum(selectedOption?.value ?? "")
                }
                isSearchable
                isClearable
                placeholder="Tìm kiếm giảng viên theo tên"
                styles={styleSelect}
              />
            </div>
          </div>

          <div className="flex items-center mb-5 gap-5">
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Thời gian đăng ký (bắt đầu):
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border-gray-400 border-1 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:border-1"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Thời gian đăng ký (kết thúc):
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border-gray-400 border-1 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:border-1"
              />
            </div>
          </div>

          <div className="flex items-center mb-3 gap-5">
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Chọn kỳ học đồ án:
              </label>
              <Select
                value={
                  OptionTopicSemesterList.find(
                    (us) => Number(us.value) === topicSemesterID
                  ) ?? null
                }
                options={OptionTopicSemesterList}
                onChange={(selectedOption) =>
                  setTopicSemesterID(Number(selectedOption?.value) ?? null)
                }
                isSearchable
                isClearable
                placeholder="Tìm kỳ học đồ án theo tên"
                isDisabled
                styles={styleSelect}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Chọn chuyên ngành:
              </label>
              <Select
                value={
                  OptionMajorList.find((us) => Number(us.value) === majorID) ??
                  null
                }
                options={OptionMajorList}
                onChange={(selectedOption) =>
                  setMajorID(Number(selectedOption?.value) ?? null)
                }
                isSearchable
                isClearable
                placeholder="Tìm kiếm chuyên ngành tên"
                styles={styleSelect}
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg h-fit p-8 mt-5">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Danh sách sinh viên</h3>
            <div className="flex items-center mb-4 gap-5 justify-end">
              <button
                onClick={() => setshowAddStudentsWithExcel(true)}
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit"
              >
                Thêm sinh viên bằng excel
              </button>
              <button
                onClick={() => setShowAddSigleStudent(true)}
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit"
              >
                Thêm sinh viên
              </button>
              <button
                onClick={handleUpdateClass}
                className="bg-blue-900 border-red-600 border-2 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit"
              >
                Cập nhật lớp học
              </button>
            </div>
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
                  <th className="py-2 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {students.map((user, idx) => (
                  <tr key={idx} className="cursor-pointer border-t">
                    <td className="py-2 px-4">{user.idNum}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.age}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.sex}</td>
                    <td className="py-2 px-4">{user.major?.name}</td>
                    <td className="py-2 px-4">{user.course?.name}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => deleteStudentTopic(user)}
                        className="bg-blue-900 hover:bg-blue-950 text-white px-2 py-1 rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* popup */}
      {showAddSigleStudent && (
        <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] h-[160px] space-y-4">
            <input
              type="text"
              placeholder="Nhập MSSV"
              onChange={(e) => setIdNum(e.target.value)}
              className="w-full border-gray-400 border-1 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:border-1 mb-8"
            />
            <div className="relative flex">
              <button
                onClick={() => setShowAddSigleStudent(false)}
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute"
              >
                Hủy
              </button>
              <button
                onClick={() => fetchSingleStudent(idNum)}
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit absolute end-0"
              >
                Thêm sinh viên
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddStudentsWithExcel && (
        <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[1000px] h-[400px] space-y-4">
            <div className="relative flex">
              <button
                onClick={() => setshowAddStudentsWithExcel(false)}
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded w-fit"
              >
                Đóng
              </button>
            </div>
            <img src={mau_excel} alt="" />
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleExcelUpload(e)}
              className="w-full border-gray-400 border-1 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:border-1 mb-8"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassTopicDetailPage;

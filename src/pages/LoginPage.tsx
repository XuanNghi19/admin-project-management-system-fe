import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/user.service";
import {
  AuthenticationResponse,
  AuthenticationRequest,
} from "../types/user.types";
import {
  ApiResponse,
  isIntrospectResponse,
  JwtPayload,
} from "../types/common.types";
import { ErrorCode, Role } from "../types/enum.types";
import { jwtDecode } from "jwt-decode";

const LoginPage: React.FC = () => {
  const [idNum, setIdNum] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Kiểm tra token khi trang load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin"); // Nếu token đã tồn tại, điều hướng đến trang admin
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!idNum || !password) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      const request: AuthenticationRequest = { idNum, password };
      const response: ApiResponse<AuthenticationResponse | string> =
        await login(request);

      if (response.code === 200 && typeof response.result !== "string") {
        const authenticationResponse: AuthenticationResponse = response.result;
        const token = authenticationResponse.token;
        const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token); // Giải mã token để lấy thông tin người dùng

        console.log(decodedToken.role);
        console.log(Role.ADMIN);

        if (decodedToken.role !== Role.ADMIN) {
          setError("Bạn không có quyền truy cập.");
          return;
        }

        // Lưu token và role vào localStorage
        localStorage.setItem("token", token);

        // Điều hướng đến trang admin
        navigate("/admin");
      } else if (response.code === 401) {
        // xử lý trường hợp token hết hạn hoặc không hợp lệ
        const introspectResponse = response.result;
        if (isIntrospectResponse(introspectResponse)) {
          introspectResponse.errorCode === ErrorCode.TOKEN_EXPIRED
            ? setError("Thời gian đăng nhập đã hết.")
            : setError("Đăng nhập không hợp lệ.");
        }
      } else {
        console.log(response.result);
        setError("Đăng nhập thất bại.");
      }
    } catch (err) {
      console.log(err);
      setError("Đăng nhập thất bại.");
    }
  };

  return (
    <div className="top-0 left-0 h-screen w-screen flex items-center justify-center bg-[url(../../public/bg.png)] ">
      <div className="bg-white h-[400px] w-[500px] rounded shadow-md flex flex-col items-center justify-center backdrop-blur-3xl p-16 gap-4">
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          placeholder="Username"
          value={idNum}
          onChange={(e) => setIdNum(e.target.value)}
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-400 font-medium rounded w-36 h-14 text-white" onClick={handleLogin}>Đăng nhập</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

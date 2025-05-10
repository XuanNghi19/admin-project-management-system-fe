import { Navigate, Outlet } from "react-router-dom";
import { introspect } from "../services/user.service";
import { ApiResponse, IntrospectResponse } from "../types/common.types";
import { useEffect, useState } from "react";

const RequireAuth = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        console.log("!token");
        return;
      }

      try {
        console.log("checkAuth");
        const res: ApiResponse<IntrospectResponse | string> = await introspect(
          token
        );

        if (res.code === 200) {
          setIsValid(true);
          console.log("res", res);
          return;
        } else if (res.code === 401 && typeof res.result !== "string") {
          setIsValid(false);
          console.log(res.result);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log("error: ", error);
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    checkAuth();
  }, []);

  if (isValid === null) {
    return (
      <>
        <div className="bg-gray-300 flex justify-center items-center w-screen h-screen">
          <div className="animate-spin z-10">Loading</div>
        </div>
      </>
    );
  }

  return isValid ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAuth;

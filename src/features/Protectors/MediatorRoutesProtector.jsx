import { Navigate, Outlet } from "react-router-dom";
import useLoginData from "../Auth/useLoginData";

function AuthRoutesProtector() {
  const { data, isLoading } = useLoginData();
  if (isLoading) return <h1>Loading...</h1>;

  if (data?.error) return <Navigate to="/auth/login" replace />;
  if (data.level === 1) return <Navigate to="/user/dashboard" />;
  if (data.level === 2) return <Outlet />;
  if (data.level === 3) return <Navigate to="/admin/dashboard" />;
}

export default AuthRoutesProtector;

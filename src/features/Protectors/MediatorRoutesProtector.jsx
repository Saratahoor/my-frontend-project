import { Navigate } from "react-router-dom";
import useLoginData from "../Auth/useLoginData";
import MediatorLayout from "../../pages/MediatorLayout";

function AuthRoutesProtector() {
  const { data, isLoading } = useLoginData();
  if (isLoading) return <h1>Loading...</h1>;

  if (data?.error) return <Navigate to="/auth/login" replace />;
  if (data.level === 1) return <Navigate to="/user/dashboard" />;
  if (data.level === 2) return <MediatorLayout />;
  if (data.level === 3) return <Navigate to="/admin/dashboard" />;
}

export default AuthRoutesProtector;

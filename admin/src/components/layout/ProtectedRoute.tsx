import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute() {
  const { admin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="grid min-h-screen place-items-center text-sm font-bold text-zinc-500">Loading admin session</div>;
  }

  if (!admin) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  return children;
}

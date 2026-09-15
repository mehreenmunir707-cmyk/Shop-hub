import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Firebase abhi check kar raha hai
  if (loading) {
    return <Loader text="Checking account..." />;
  }

  // User logged in hai
  if (user) {
    return children;
  }

  // User logged in nahi hai
  return (
    <Navigate
      to="/login"
      replace
      state={{
        from: location.pathname,
      }}
    />
  );
}
import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute
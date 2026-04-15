import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/context/user";

const ProtectedRoute = ({ children }) => {
  const user = useUser();
  const navigate = useNavigate();

  if (!user.current) {
    navigate("/login");
    return null;
  }
  return { children };
};

export default ProtectedRoute;

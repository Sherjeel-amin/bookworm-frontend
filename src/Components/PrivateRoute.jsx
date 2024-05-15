import { Navigate, useLocation, Outlet } from "react-router-dom";
import { authenticated } from "../services/authenticate";

export const PrivateRoutes = () => {
  const location = useLocation();
  return authenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
};
 
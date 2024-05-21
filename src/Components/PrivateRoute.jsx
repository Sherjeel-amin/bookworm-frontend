import { Navigate, Outlet } from "react-router-dom";
import { authenticated } from "../services/authenticate";

export const PrivateRoutes = () => {
  return authenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login"  />
  );
};
 
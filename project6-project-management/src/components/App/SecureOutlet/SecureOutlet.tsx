import { useAppStore } from "@/store/app/appStore";
import { Navigate, Outlet } from "react-router-dom";
import { EnRoutePath } from "../util/routes";

export function SecureOutlet() {
  const isAuthenticated = useAppStore(sw => sw.state.isAuthenticated);
  if (isAuthenticated) return <Outlet />;
  else return <Navigate to={EnRoutePath.Test} />;
}

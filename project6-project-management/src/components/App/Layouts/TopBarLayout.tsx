import { RNavLink } from "@/components/Common/RNavLink/RNavLink";
import { Outlet, useLocation } from "react-router-dom";
import { EnRoutePath } from "../util/routes";

export function TopBarLayout() {
  const location = useLocation();
  const isOnPlaces2 = location.pathname === EnRoutePath.Places2;

  return (
    <div className="flex flex-col gap-1 w-full">
      <nav>
        <ul className="flex gap-2 p-2">
          <li><RNavLink to={EnRoutePath.Test}>Test</RNavLink></li>
          {isOnPlaces2 && <li><RNavLink to={EnRoutePath.Places}>Places</RNavLink></li>}
          <li><RNavLink to={EnRoutePath.Places2}>Places2</RNavLink></li>
        </ul>
      </nav>
      <div className="flex-grow overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}

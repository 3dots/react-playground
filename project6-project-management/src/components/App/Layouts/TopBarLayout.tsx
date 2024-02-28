import { RNavLink } from "@/components/Common/RNavLink/RNavLink";
import { Outlet, useLocation } from "react-router-dom";
import { EnRoutePath } from "../util/routes";
import { EnButtonType, RButton } from "@/components/Common/RButton/RButton";
import { useAppStore } from "@/store/app/appStore";

export function TopBarLayout() {
  const location = useLocation();
  const isOnPlaces2 = location.pathname === EnRoutePath.Places2;
  const [isAuthenticated, login] = useAppStore(sw => [
    sw.state.isAuthenticated,
    sw.login,
  ]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <nav className="flex">
        <ul className="flex gap-2 p-2">
          <li>
            <RNavLink to={EnRoutePath.Test}>Test</RNavLink>
          </li>
          <li>
            <RNavLink to={EnRoutePath.Test2}>Test2</RNavLink>
          </li>
          {isOnPlaces2 && (
            <li>
              <RNavLink to={EnRoutePath.Places}>Places</RNavLink>
            </li>
          )}
          <li>
            <RNavLink to={EnRoutePath.Places2}>Places2</RNavLink>
          </li>
        </ul>
        <ul className="flex gap-2 p-2 ml-4">
          {!isAuthenticated && (
            <li>
              <RButton onClick={() => login(true)}>Login</RButton>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <RButton
                buttonType={EnButtonType.Secondary}
                onClick={() => login(false)}
              >
                Logout
              </RButton>
            </li>
          )}
        </ul>
      </nav>
      <div className="flex-grow overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}

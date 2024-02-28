import { ManageProjects } from "@/components/ManageProjects/ManageProjects";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { TopBarLayout } from "../Layouts/TopBarLayout";
import { Test, testLoader } from "@/components/Test/Test";
import { nameof } from "@/store/util/util";
import { PlaceWishes } from "@/components/PlaceWishes/PlaceWishes";
import { PlaceWishesAlt } from "@/components/PlaceWishes/PlaceWishesAlt";
import { FormsPlayground } from "@/components/FormsPlayground/FormsPlayground";
import { NotFound } from "../NotFound/NotFound";
import { SecureOutlet } from "../SecureOutlet/SecureOutlet";

export enum EnRoutePath {
  Default = "/",
  Test = "/test",
  Test2 = "/test2",
  Places = "/places",
  Places2 = "/places2",
  Forms = "/forms",
}

export type TestParams = {
  id: string;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={EnRoutePath.Default} element={<ManageProjects />} />
      <Route element={<TopBarLayout />}>
        <Route path={EnRoutePath.Test} element={<Test />} />
        <Route
          path={EnRoutePath.Test2}
          element={<Test />}
          loader={testLoader}
        />
        <Route
          path={`${EnRoutePath.Test}/:${nameof<TestParams>("id")}`}
          element={<Test />}
        />
        <Route element={<SecureOutlet />}>
          <Route path={EnRoutePath.Places} element={<PlaceWishes />} />
          <Route path={EnRoutePath.Places2} element={<PlaceWishesAlt />} />
        </Route>
      </Route>
      {/* Relative paths. This seems iffy. / means total path */}
      <Route element={<TopBarLayout />} path="/root">
        <Route path="test" element={<Test />} />
      </Route>
      <Route path={EnRoutePath.Forms} element={<FormsPlayground />} />
      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

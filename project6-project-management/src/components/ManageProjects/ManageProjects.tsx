import cssClasses from "./ManageProjects.module.css";
import { MainContent } from "./MainContent/MainContent";
import { SideBarContent } from "./SideBarContent/SideBarContent";

export function ManageProjects() {
  return (
    <div className="flex pt-1 lg:pt-8">
      <aside
        className={`${cssClasses.aside} bg-black text-white rounded-tr-2xl p-2 pl-6`}
      >
        <SideBarContent />
      </aside>
      <main
        className={`${cssClasses.main} px-2 pb-2 pt-7 flex flex-col min-w-0 overflow-auto gap-2`}
      >
        <MainContent />
      </main>
    </div>
  );
}

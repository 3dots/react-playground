import cssClasses from "./App.module.css";
import { MainContent } from "./components/MainContent/MainContent";
import { SideBarContent } from "./components/SideBarContent/SideBarContent";

export function App() {
  return (
    <>
      <aside
        className={`${cssClasses.aside} bg-black text-white rounded-tr-2xl p-2 pl-6`}
      >
        <SideBarContent />
      </aside>
      <main className={`${cssClasses.main} px-2 pb-2 pt-7 flex flex-col`}>
        <MainContent />
      </main>
    </>
  );
}

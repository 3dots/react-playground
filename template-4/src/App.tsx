import { HeaderContent } from "./components/HeaderContent/HeaderContent";
import { MainContent } from "./components/MainContent/MainContent";
import { SideBarContent } from "./components/SideBarContent/SideBarContent";
import cssClasses from "./App.module.css"

export function App() {
  return (
    <>
      <header className="p-2">
        <HeaderContent />
      </header>
      <div className={`${cssClasses["my-grid"]} grid grow overflow-auto`}>
        <aside className="bg-black text-white rounded-tr-2xl p-2 pl-6">
          <SideBarContent />
        </aside>
        <main className="px-2 pb-2 pt-7 flex flex-col gap-2">
          <MainContent />
        </main>
      </div>
    </>
  );
}

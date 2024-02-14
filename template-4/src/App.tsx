import { HeaderContent } from "./components/HeaderContent/HeaderContent";
import { MainContent } from "./components/MainContent/MainContent";
import { SideBarContent } from "./components/SideBarContent/SideBarContent";

export function App() {
  return (
    <>
      <header className="p-2">
        <HeaderContent />
      </header>
      <div className="flex grow overflow-auto">
        <aside className="w-[17rem] bg-black text-white rounded-tr-2xl p-2 pl-6">
          <SideBarContent />
        </aside>
        <main className="w-[700px] px-2 pb-2 pt-7 flex flex-col gap-2">
          <MainContent />
        </main>
      </div>
    </>
  );
}

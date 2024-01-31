import AuthInputs from "./components/AuthInputs/AuthInputs"
import { HeaderContent } from "./components/Header/Header"
import cssClasses from "./App.module.css"

export function App() {
  return (
    <>  
      <header className={`${cssClasses.header} flex flex-col items-center justify-center my-8 md:my-16`}>
        <HeaderContent />
      </header>
      <main className="main">
        <AuthInputs />
      </main>
    </>
  )
}

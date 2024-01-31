import AuthInputs from "./components/AuthInputs/AuthInputs"
import { HeaderContent } from "./components/Header/Header"
import cssClasses from "./App.module.scss"

export function App() {
  return (
    <>
      <header className={cssClasses.header}>
        <HeaderContent />
      </header>
      <main className="main">
        <AuthInputs />
      </main>
    </>
  )
}

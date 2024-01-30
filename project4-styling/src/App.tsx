import AuthInputs from "./components/AuthInputs/AuthInputs"
import { HeaderContent } from "./components/Header/Header"

export function App() {
  return (
    <>
      <header className="header">
        <HeaderContent />
      </header>
      <main className="main">
        <AuthInputs />
      </main>
    </>
  )
}

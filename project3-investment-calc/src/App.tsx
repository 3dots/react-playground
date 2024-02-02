import { HeaderContent } from "./components/Header/Header";
import { InvCalculatorInputs } from "./components/InvCalculatorInputs/InvCalculatorInputs";
import { InvResults } from "./components/InvResults/InvResults";

export function App() {
  return (
    <>
      <header className="header">
        <HeaderContent />
      </header>
      <main className="main">
        <h1 className="center">React Investment Calculator</h1>
        <InvCalculatorInputs />
        <InvResults />
      </main>
    </>
  );
}

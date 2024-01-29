import { Header } from "./components/Header/Header";
import { CoreConcepts } from "./components/CoreConcepts/CoreConcepts";
import { Examples } from "./components/Examples/Examples";

export function App() {

  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </div>
  );
}

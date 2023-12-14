import { CoreConcept, ICoreConcept } from "./components/core-concept/CoreConcept";
import Header from "./components/header/Header";
import compImg from '@/assets/components.png';
import { CORE_CONCEPTS } from "./data/data";

function App() {

  const c : ICoreConcept = CORE_CONCEPTS[0];

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept 
              title="Components" 
              description="The core UI building block." 
              image={compImg} />
            <CoreConcept {...c} />
          </ul>
        </section>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;

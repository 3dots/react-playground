import CoreConcept from "./components/core-concept/CoreConcept";
import Header from "./components/header/Header";
import compImg from '@/assets/components.png';

function App() {
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
              img={compImg} />
          </ul>
        </section>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;

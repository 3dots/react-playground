import {
  CoreConcept,
  ICoreConcept,
} from "./components/CoreConcept/CoreConcept";
import { Header } from "./components/Header/Header";
import compImg from "@/assets/components.png";
import { CORE_CONCEPTS, ITabSection, TAB_SECTIONS } from "./data/data";
import { TabButton } from "./components/TabButton/TabButton";

export function App() {

  const handleTabSelect = function() {
    console.log("test2");
  }

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
              image={compImg}
            />
            {CORE_CONCEPTS.map((c : ICoreConcept) =>
              <CoreConcept {...c} />
            )}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            {TAB_SECTIONS.map((tab : ITabSection) =>
              <TabButton onSelect={handleTabSelect} >{tab.title}</TabButton>
            )}
          </menu>
        </section>
      </main>
    </div>
  );
}

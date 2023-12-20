import { CORE_CONCEPTS, CoreConceptVM } from "@/data/data";
import { CoreConcept } from "@/components/CoreConcept/CoreConcept";
import compImg from "@/assets/components.png";

export function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        <CoreConcept
          title="Components"
          description="The core UI building block."
          image={compImg}
        />
        {CORE_CONCEPTS.map((c: CoreConceptVM) => (
          <CoreConcept {...c} key={c.key} />
        ))}
      </ul>
    </section>
  );
}

import { CORE_CONCEPTS, CoreConceptVM } from "@/data/data";
import { CoreConcept } from "@/components/CoreConcept/CoreConcept";
import compImg from "@/assets/components.png";
import { Section } from "../Section/Section";

export function CoreConcepts() {
  return (
    <Section title="Core Concepts" id="core-concepts">
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
    </Section>
  );
}

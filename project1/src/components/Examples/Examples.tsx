import { IExample, CORE_CONCEPTS, EXAMPLES, CoreConceptVM } from "@/data/data";
import { useState } from "react";
import { TabButton } from "@/components/TabButton/TabButton";
import { Section } from "../Section/Section";
import { Tabs } from "../Tabs/Tabs";

export function Examples() {
  const [example, setExample] = useState<IExample>();

  const handleTabSelect = function (index: number) {
    const title = CORE_CONCEPTS[index].title.toLowerCase();
    setExample(title in EXAMPLES ? (EXAMPLES as any)[title] : null);
  };

  return (
    <Section title="Examples" id="examples">
      <Tabs
        tabButtons={
          <>
            {CORE_CONCEPTS.map((c: CoreConceptVM, i: number) => (
              <TabButton
                onClick={() => handleTabSelect(i)}
                key={c.key}
                isSelected={c.title == example?.title}
              >
                {c.title}
              </TabButton>
            ))}
          </>
        }
      >
        {!example && <p>Please select a button.</p>}
        {example && (
          <div id="tab-content">
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <pre>
              <code>{example.code}</code>
            </pre>
          </div>
        )}
      </Tabs>
    </Section>
  );
}

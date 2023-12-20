import { IExample, CORE_CONCEPTS, EXAMPLES, CoreConceptVM } from "@/data/data";
import { useState } from "react";
import { TabButton } from "@/components/TabButton/TabButton";

export function Examples() {
  const [example, setExample] = useState<IExample>();

  const handleTabSelect = function (index: number) {
    const title = CORE_CONCEPTS[index].title.toLowerCase();
    setExample(title in EXAMPLES ? (EXAMPLES as any)[title] : null);
  };

  return (
    <section id="examples">
      <h2>Examples</h2>
      <menu>
        {CORE_CONCEPTS.map((c: CoreConceptVM, i: number) => (
          <TabButton
            onSelect={() => handleTabSelect(i)}
            key={c.key}
            isSelected={c.title == example?.title}
          >
            {c.title}
          </TabButton>
        ))}
      </menu>
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
    </section>
  );
}

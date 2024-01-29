
import { PropsWithChildren } from "react";

export interface ISectionProps extends React.ComponentProps<"section"> {
  title: string
}

export function Section(props: PropsWithChildren<ISectionProps>) {

  const { title, children, ...attrs } = { ...props };

  return (
    <section {...attrs}>
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
}
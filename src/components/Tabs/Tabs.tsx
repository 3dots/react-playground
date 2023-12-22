import { PropsWithChildren, ReactNode } from "react";

export interface ITabsProps {
  tabButtons: ReactNode,
  buttonsContainer?: React.ComponentType<PropsWithChildren> | React.ElementType
}

export function Tabs(props: PropsWithChildren<ITabsProps>) {

  const ButtonsContainer = props.buttonsContainer ?? "menu";

  return <>
    <ButtonsContainer>
      {props.tabButtons}
    </ButtonsContainer>
    {props.children}
  </>;
}
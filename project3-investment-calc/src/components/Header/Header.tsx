import logoImg from "@/assets/investment-calculator-logo.png";
import { useIntl } from "../Intl/Intl";

export function HeaderContent() {
  const intl = useIntl();
  return (
    <>
      <img src={logoImg} alt={intl.formatMessage({ id: "app.title" })} />
    </>
  );
}

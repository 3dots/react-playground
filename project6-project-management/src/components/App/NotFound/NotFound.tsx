import { FormattedMessage } from "../../Common/Intl/Intl";
import { RH1 } from "../../Common/RH/RH";

export function NotFound() {
  return (
    <main className="p-2">
      <RH1>404</RH1>
      <p>
        <FormattedMessage id="txt.route.not.found" />
      </p>
    </main>
  );
}

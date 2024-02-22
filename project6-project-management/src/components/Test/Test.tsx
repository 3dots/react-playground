import { useState } from "react";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";
import { RH1 } from "../Common/RH/RH";
import { tryCatchWrapper, useAppStore } from "@/store/app/appStore";

export function Test() {
  const [isRenderException, setIsRenderException] = useState(false);
  const testException = useAppStore(sw => sw.testException);

  if (isRenderException) throw new Error("Render exception");

  return (
    <main className="p-2 flex flex-col gap-2">
      <RH1>
        <FormattedMessage id="ttl.test" />
      </RH1>
      <div className="flex gap-2">
        <RButton onClick={() => setIsRenderException(true)}>
          <FormattedMessage id="btn.test.render.exception" />
        </RButton>
        <RButton
          onClick={() =>
            tryCatchWrapper(() => {
              throw new Error("Handler error");
            })()
          }
        >
          <FormattedMessage id="btn.test.click.exception" />
        </RButton>
      </div>
      <div>
        <RButton onClick={testException}>
          <FormattedMessage id="btn.test.reducer.exception" />
        </RButton>
      </div>
    </main>
  );
}

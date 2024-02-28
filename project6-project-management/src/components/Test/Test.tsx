import { useState } from "react";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";
import { RH1 } from "../Common/RH/RH";
import { tryCatchWrapper, useAppStore } from "@/store/app/appStore";
import { useLoaderData, useNavigate, useNavigation, useParams } from "react-router-dom";
import type { TestParams } from "../App/util/routes";
import { EnRoutePath } from "../App/util/routes";

export function Test() {
  const [isRenderException, setIsRenderException] = useState(false);
  const testException = useAppStore(sw => sw.testException);

  if (isRenderException) throw new Error("Render exception");

  const navigate = useNavigate();

  const params = useParams<TestParams>();

  const loaderData = useLoaderData() as string;
  
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
      <div>
        <RButton onClick={() => navigate(EnRoutePath.Default)}>
          Test manual navigate
        </RButton>
      </div>
      <div>
          Params: {params.id}
      </div>
      <div>
        Loader data: {loaderData}
      </div>
    </main>
  );
}

export function testLoader(): Promise<string> {
  return new Promise(resolve => { setTimeout(() => resolve("Such data"), 2000) });
}
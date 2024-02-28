import { ErrorBoundary } from "./ErrorBoundary/ErrorBoundary";
import { useState, type ErrorInfo } from "react";
import { useAppStore } from "../../store/app/appStore";
import { RH1 } from "../Common/RH/RH";
import { FormattedMessage } from "../Common/Intl/Intl";
import { LoadingOverlay } from "./LoadingOverlay/LoadingOverlay";
import { RouterProvider } from "react-router-dom";
import { router } from "./util/routes";

export function App() {
  const [errorBoundaryKey] = useState(0);

  const [isError, errorMsg, timeStamp, isLoading, errorTriggered] = useAppStore(
    sw => [
      sw.state.isError,
      sw.state.errorMsg,
      sw.state.timeStamp,
      sw.state.isLoading,
      sw.errorTriggered,
    ],
  );

  function handleRenderError(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    errorTriggered(error?.message);
  }

  if (isError) {
    return (
      <main className="p-2 flex flex-col gap-2">
        <RH1>
          <FormattedMessage id="ttl.error" />
        </RH1>
        <div>
          <FormattedMessage id="txt.uae" />
        </div>
        <div>{timeStamp}</div>
        <div>{errorMsg}</div>
      </main>
    );
  } else {
    return (
      <ErrorBoundary key={errorBoundaryKey} onError={handleRenderError}>
        <LoadingOverlay isLoading={isLoading} isGlobal={true} />
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
  }
}

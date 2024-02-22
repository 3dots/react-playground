import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ManageProjects } from "../ManageProjects/ManageProjects";
import { Test } from "../Test/Test";
import { NotFound } from "./NotFound/NotFound";
import { ErrorBoundary } from "./ErrorBoundary/ErrorBoundary";
import { useState, type ErrorInfo } from "react";
import { useAppStore } from "../../store/app/appStore";
import { RH1 } from "../Common/RH/RH";
import { FormattedMessage } from "../Common/Intl/Intl";
import { PlaceWishes } from "../PlaceWishes/PlaceWishes";
import { LoadingOverlay } from "./LoadingOverlay/LoadingOverlay";

export function App() {
  const [errorBoundaryKey] = useState(0);

  const [isError, errorMsg, isLoading, errorTriggered] = useAppStore(sw => [
    sw.state.isError,
    sw.state.errorMsg,
    sw.state.isLoading,
    sw.errorTriggered,
  ]);

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
        <div>{errorMsg}</div>
      </main>
    );
  } else {
    return (
      <ErrorBoundary key={errorBoundaryKey} onError={handleRenderError}>
        <LoadingOverlay isLoading={isLoading} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ManageProjects />} />
            <Route path="/test" element={<Test />} />
            <Route path="/places" element={<PlaceWishes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ManageProjects } from "./components/ManageProjects/ManageProjects";
import { Test } from "./components/Test/Test";
import { NotFound } from "./components/NotFound/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { useState, type ErrorInfo } from "react";
import { useAppStore } from "./store/app/appStore";
import { RH1 } from "./components/Common/RH/RH";
import { FormattedMessage } from "./components/Common/Intl/Intl";

export function App() {
  const [errorBoundaryKey] = useState(0);

  const [isError, errorTriggered] = useAppStore(sw => [
    sw.state.isError,
    sw.errorTriggered,
  ]);

  function handleRenderError(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    errorTriggered();
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
        <div>Todo: add export log button.</div>
      </main>
    );
  } else {
    return (
      <ErrorBoundary key={errorBoundaryKey} onError={handleRenderError}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ManageProjects />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

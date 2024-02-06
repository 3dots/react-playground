import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { IntlProvider } from "react-intl";
import messages_en from "./translations/en.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlProvider locale="en-CA" messages={messages_en}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
);

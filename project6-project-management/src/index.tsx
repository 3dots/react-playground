import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import messages_en from "./translations/en.json";
import { App } from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlProvider locale="en-CA" messages={messages_en}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
);

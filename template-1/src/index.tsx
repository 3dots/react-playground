import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { IntlProvider } from "react-intl";
import messages_en from "./translations/en.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale="en-CA" messages={messages_en}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
);

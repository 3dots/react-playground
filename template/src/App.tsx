import { HeaderContent } from "./components/Header/Header";
import { FormattedMessage } from "./components/Intl/Intl";

export function App() {
  return (
    <>
      <header className="header">
        <HeaderContent />
      </header>
      <main className="main">
        <h1 className="center">
          <FormattedMessage id="app.title" />
        </h1>
        Hello world!
      </main>
    </>
  );
}

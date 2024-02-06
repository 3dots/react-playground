import { HeaderContent } from "./components/Header/Header";
import { FormattedMessage } from "./components/Intl/Intl";
import { useBearStore } from "./store/testStore";

export function App() {

  const { bears, increase } = useBearStore();

  return (
    <>
      <header className="header">
        <HeaderContent />
      </header>
      <main className="main">
        <h1 className="center">
          <FormattedMessage id="app.title" />
        </h1>
        <div>
          {bears}
        </div>
        <div>
          <button onClick={() => increase(5)}>Test increase</button>
        </div>
      </main>
    </>
  );
}

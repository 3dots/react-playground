import { HeaderContent } from "./components/Header/Header";
import { FormattedMessage } from "./components/Intl/Intl";
import { useTestStore } from "./store/testStore";

export function App() {
  const { state, increaseCountAction } = useTestStore();

  return (
    <>
      <header className="header">
        <HeaderContent />
      </header>
      <main className="main">
        <h1 className="center">
          <FormattedMessage id="app.title" />
        </h1>
        <div>{state.count}</div>
        <div>
          <button onClick={() => increaseCountAction(5)}>Test increase</button>
        </div>
      </main>
    </>
  );
}

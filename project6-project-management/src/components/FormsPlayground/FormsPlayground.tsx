import { Header } from "./Header/Header";
import { Login } from "./Login/Login";
import "./FormsPlayground.scss";

export function FormsPlayground() {
  return (
    <div className="forms-playground-container">
      <Header />
      <main>
        <Login />
      </main>
    </div>
  );
}
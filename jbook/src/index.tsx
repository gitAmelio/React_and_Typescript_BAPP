import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import CodeCell from "./components/code-cell";
import './index.css'

const root = createRoot(document.getElementById("root")!);

const App = () => {
  return (
    <>
      <CodeCell />
    </>
  );
};

root.render(
  <>
    <App />
  </>
);

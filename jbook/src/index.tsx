import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import CodeCell from "./components/code-cell";

const root = createRoot(document.getElementById("root")!);

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

root.render(
  <div>
    <App />
  </div>
);

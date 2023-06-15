import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
// import CodeCell from "./components/code-cell";
import './index.css'
import TextEditor from "./components/text-editor";

const root = createRoot(document.getElementById("root")!);

const App = () => {
  return (
    <>
      {/* <CodeCell /> */}
      <TextEditor />
    </>
  );
};

root.render(
  <>
    <App />
  </>
);

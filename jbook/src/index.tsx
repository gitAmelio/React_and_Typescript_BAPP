import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "./state";
import { createRoot } from "react-dom/client";
// import CodeCell from "./components/code-cell";
import './index.css'
import TextEditor from "./components/text-editor";

const root = createRoot(document.getElementById("root")!);

const App = () => {
  return (
    <Provider store={store}>
      <>
        {/* <CodeCell /> */}
        <TextEditor />
      </>
    </Provider>
  );
};

root.render(
  <>
    <App />
  </>
);

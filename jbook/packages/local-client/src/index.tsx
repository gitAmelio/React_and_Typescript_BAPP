import "bulmaswatch/superhero/bulmaswatch.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from "react-redux";
import { store } from "./state";
import { createRoot } from "react-dom/client";
import CellList from "./components/cell-list";

import './index.css'

const root = createRoot(document.getElementById("root")!);

const App = () => {
  return (
    <Provider store={store}>
      <>
        <CellList />
      </>
    </Provider>
  );
};

root.render(
  <>
    <App />
  </>
);

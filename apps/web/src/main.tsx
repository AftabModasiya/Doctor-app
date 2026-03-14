import { Analytics } from "@vercel/analytics/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./i18n";
import "./index.css";
import store, { persistor } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Analytics />
    </PersistGate>
  </Provider>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider as ThemeProvider } from "./components/ui/provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
      </Provider>
  </StrictMode>
);

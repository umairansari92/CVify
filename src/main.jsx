import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { registerSW } from 'virtual:pwa-register';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  try {
    registerSW({ immediate: true });
  } catch (e) {
    // registration failed or virtual module not available in dev
  }
}

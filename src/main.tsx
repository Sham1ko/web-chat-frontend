import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/index.ts";
import "./index.css";
import Router from "./router/Router.tsx";
import ModalProvider from "./providers/ModalProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router.jsx";
import "./index.css";
import { Provider } from "@/components/ui/provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <Router />
    </Provider>
  </React.StrictMode>
);

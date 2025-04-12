import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  ExperimentFinderPage,
  PeriodicTablePage,
  ScienceChatPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/experiments",
    element: <ExperimentFinderPage />,
  },
  {
    path: "/periodic-table",
    element: <PeriodicTablePage />,
  },
  {
    path: "/chat",
    element: <ScienceChatPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

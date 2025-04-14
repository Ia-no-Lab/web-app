import {
  createRouter,
  createRootRoute,
  createRoute
} from "@tanstack/react-router";

import {
  About,
  Terms,
  Dashboard,
  Chat,
  Home,
  Experiment,
  PeriodicTable,
  Auth,
  Register 
} from "@/src/pages";

import VulcaoBicarbonato from "@/src/pages/experimentos/VulcaoBicarbonato";
import DensidadeLiquidos from "@/src/pages/experimentos/DensidadeLiquidos";
import Cromatografia from "@/src/pages/experimentos/Cromatografia";

import App from "@/src/App";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: Home,
});

const aboutRoute = createRoute({
  path: "/sobre",
  getParentRoute: () => rootRoute,
  component: About,
});

const termsRoute = createRoute({
  path: "/normas",
  getParentRoute: () => rootRoute,
  component: Terms,
});

const authRoute = createRoute({
  path: "/auth",
  getParentRoute: () => rootRoute,
  component: Auth,
});

const registerRoute = createRoute({
  path: "/auth/registro",
  getParentRoute: () => rootRoute,
  component: Register,
})  

const dashboardRoute = createRoute({
  path: "/home",
  getParentRoute: () => rootRoute,
  component: Dashboard,
});

const chatRoute = createRoute({
  path: "/chat",
  getParentRoute: () => dashboardRoute,
  component: Chat,
});

const experimentRoute = createRoute({
  path: "/experimentos",
  getParentRoute: () => dashboardRoute,
  component: Experiment,
});

const periodicTableRoute = createRoute({
  path: "/tabela-periodica",
  getParentRoute: () => dashboardRoute,
  component: PeriodicTable,
});

const vulcaoRoute = createRoute({
  path: "/experimentos/vulcao-bicarbonato",
  getParentRoute: () => dashboardRoute,
  component: VulcaoBicarbonato,
});

const densidadeRoute = createRoute({
  path: "/experimentos/densidade-liquidos",
  getParentRoute: () => dashboardRoute,
  component: DensidadeLiquidos,
});

const cromatografiaRoute = createRoute({
  path: "/experimentos/cromatografia",
  getParentRoute: () => dashboardRoute,
  component: Cromatografia,
});


const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  termsRoute,
  authRoute,
  dashboardRoute.addChildren([
    chatRoute,
    experimentRoute,
    periodicTableRoute,
    vulcaoRoute,
    densidadeRoute,
    cromatografiaRoute,
  ]),
]);

export const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

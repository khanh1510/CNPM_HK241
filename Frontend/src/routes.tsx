import { redirect, type RouteObject } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import ErrorBoundary from "./layout/ErrorBoundary";

function lazy(moduleLoader: () => Promise<any> /* eslint-disable-line */) {
  return async () => {
    const component = await moduleLoader();
    return { Component: component.default };
  };
}

const routes: RouteObject[] = [
  {
    path: "",
    loader: () => {
      return redirect("/home");
    },
  },
  {
    path: "home",
    lazy: lazy(() => import("./pages/home/homePage")),
  },
  
];

const routesWithLayout: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: routes,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    lazy: lazy(() => import("./pages/auth/login")),
  },
];

export default routesWithLayout;

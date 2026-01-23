import { createBrowserRouter, Navigate } from "react-router-dom";
import Applayout from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Error500 from "./pages/Error500";
import AboutUs from "./components/layouts/AboutUs";
import Services from "./components/layouts/Services";
import WhatWeDo from "./components/layouts/WhatWeDo";
import Results from "./components/layouts/Results";
import Sponsors from "./components/layouts/Reviews";
import Form from "./components/layouts/Form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout/>,
  },
  {
    path: "/error", // ✅ NEW
    element: <Error500 />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/whatwedo",
    element: <WhatWeDo />,
  },
  {
    path: "/results",
    element: <Results />,
  },
  {
    path: "/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/form",
    element: <Form />,
  }
], {
  basename: global.basename
});
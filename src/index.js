import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./Home/Home";
import Shop from "./Shop/Shop"
import Store from "../src/Store/Store"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "swiper/css";
import Review from "./Components/Review";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";
import Contact from "./Home/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/Shop",
        element: <Shop />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Store",
        element: <Store />,
      },
      {
        path: "/Review",
        element: <Review />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);

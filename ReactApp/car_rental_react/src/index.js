import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CarSelection from "./routes/CarSelection";
import CarReserve from "./routes/CarReserve";
import AuthPage from "./routes/AuthPage";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/car", element: <CarSelection /> },
      { path: "/rent", element: <CarReserve /> },
      { path: "/auth", element: <AuthPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

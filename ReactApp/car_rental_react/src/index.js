import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CarSelection from "./routes/CarSelection";
import CarReserve from "./routes/CarReserve";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/Root";
import HomePage from "./components/HomePage/HomePage";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import { ProvideAuth } from "./provider/authContext";
import RentalManager from "./routes/RentalManager";
import AdminHomePage from "./routes/AdminHomePage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/car", element: <CarSelection /> },
            { path: "/rent", element: <CarReserve /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/home", element: <HomePage /> },
      { path: "/manager", element: <RentalManager /> },
            { path: "/admin", element: <AdminHomePage /> },
        ],
    },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProvideAuth>
      <RouterProvider router={router} />
  </ProvideAuth>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

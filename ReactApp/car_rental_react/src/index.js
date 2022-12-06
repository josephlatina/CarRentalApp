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
import { ProvideAuth, useAuth } from "./provider/authContext";
import CustomerList from "./components/CustomerList/CustomerList";
import RentalManager, { loader as rentalLoader } from "./routes/RentalManager";
import AdminHomePage from "./routes/Admin/AdminHomePage";
import AdminCar, { loader as adminCarLoader } from "./routes/Admin/AdminCar";
import AdminCarDetails from "./routes/Admin/AdminCarDetails";
import BranchView, {
    loader as branchViewLoader,
} from "./routes/Admin/Branch/BranchView";

const AdminRoute = ({ children }) => {
    const { user, isSignedIn } = useAuth();

    if (isSignedIn && user.is_staff) {
        return <>{children}</>;
    }

    return (
        <div className="container">You're not authorized to see this page</div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/car", element: <CarSelection /> },
            { path: "/rent", element: <CarReserve /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { index: true, element: <HomePage /> },
            {
                path: "/admin/branches/:branchId/rentals",
                element: (
                    <AdminRoute>
                        <RentalManager />
                    </AdminRoute>
                ),
                loader: rentalLoader,
            },
            {
                path: "/admin",
                element: (
                    <AdminRoute>
                        <AdminHomePage />
                    </AdminRoute>
                ),
            },
            {
                path: "/admin/branches/:branchId",
                loader: branchViewLoader,
                element: <BranchView />,
            },
            {
                path: "/admin/customers",
                element: (
                    <AdminRoute>
                        <CustomerList />
                    </AdminRoute>
                ),
            },
            {
                path: "/admin/branches/:branchId/cars",
                element: (
                    <AdminRoute>
                        <AdminCar />
                    </AdminRoute>
                ),
                loader: adminCarLoader,
            },
            {
                path: "/admincardetails",
                element: (
                    <AdminRoute>
                        <AdminCarDetails />
                    </AdminRoute>
                ),
            },
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

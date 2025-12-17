import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/LoginPage/Login";
import Register from "../Pages/RegisterPage/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";
import AllUsers from "../Pages/Dashboard/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "search-page",
        Component: SearchPage,
      },
      {
        path: "donation-requests",
        Component: DonationRequests,
      },
      {
        path: "auth/login",
        Component: Login,
      },
      {
        path: "auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
    ],
  },
]);

export default router;

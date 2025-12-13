import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SearchPage from "../Pages/Home/SearchPage/SearchPage";
import DonationRequests from "../Pages/Home/DonationRequests/DonationRequests";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Home/LoginPage/Login";
import Register from "../Pages/Home/RegisterPage/Register";


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
        path: "/search-page",
        Component: SearchPage,
      },
      {
        path: "/donation-requests",
        Component: DonationRequests,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
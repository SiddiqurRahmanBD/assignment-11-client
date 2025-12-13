import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SearchPage from "../Pages/Home/SearchPage/SearchPage";
import DonationRequests from "../Pages/Home/DonationRequests/DonationRequests";


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
    ],
  },
]);

export default router;
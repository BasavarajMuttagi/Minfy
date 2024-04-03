import { createBrowserRouter } from "react-router-dom";
import Notifications from "../pages/Notifications.page";
import Settings from "../pages/Settings.page";
import Profile from "../pages/Profile.page";
import Home from "../pages/Home.page";
import LoginForm from "../components/LoginForm.component";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/notifications", element: <Notifications /> },
      { path: "/settings", element: <Settings /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/login", element: <LoginForm /> },
]);

export default routes;

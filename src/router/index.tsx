import { RouteObject, createBrowserRouter } from "react-router-dom";
import LoginPage from "../modules/auth/login";
import App from "../App";

const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter([
  ...authRoutes,
  { path: "/", element: <App /> },
]);

export default router;

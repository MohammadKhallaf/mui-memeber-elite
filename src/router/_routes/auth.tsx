import { RouteObject } from "react-router-dom";
import LoginPage from "../../modules/auth/login";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
];

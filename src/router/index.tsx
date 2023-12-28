import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { authRoutes } from "./_routes/auth";
import { membersRoutes } from "./_routes/members";

const router = createBrowserRouter([
  ...authRoutes,
  ...membersRoutes,
  { path: "/", element: <App /> },
]);

export default router;

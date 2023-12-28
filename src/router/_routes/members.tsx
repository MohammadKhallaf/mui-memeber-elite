import { RouteObject } from "react-router-dom";
import CreateMemberPage from "../../modules/members/create";

export const membersRoutes: RouteObject[] = [
  {
    path: "members",
    children: [
      {
        index: true,
        element: <CreateMemberPage />,
      },
      {
        path: "create",
        element: <CreateMemberPage />,
      },
    ],
  },
];

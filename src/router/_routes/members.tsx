import { RouteObject } from 'react-router-dom';
import ListMembersPage from 'src/modules/members/list';
import CreateMemberPage from '../../modules/members/create';

export const membersRoutes: RouteObject[] = [
  {
    path: 'members',
    children: [
      {
        index: true,
        element: <ListMembersPage />,
      },
      {
        path: 'create',
        element: <CreateMemberPage />,
      },
      {
        path: ':memberId/edit',
        element: <CreateMemberPage editMode />,
      },
    ],
  },
];

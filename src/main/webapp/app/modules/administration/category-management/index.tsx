import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import UserManagement from './category-management';
import UserManagementDetail from './category-management-detail';
import UserManagementUpdate from './category-management-update';
import UserManagementDeleteDialog from './user-management-delete-dialog';

const UserManagementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserManagement />} />
    <Route path="new" element={<UserManagementUpdate />} />
    <Route path=":login">
      <Route index element={<UserManagementDetail />} />
      <Route path="edit" element={<UserManagementUpdate />} />
      <Route path="delete" element={<UserManagementDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserManagementRoutes;

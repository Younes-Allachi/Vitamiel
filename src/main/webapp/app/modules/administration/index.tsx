import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import UserManagement from './user-management';
import Docs from './docs/docs';
import CategoryManagement from './category-management';
import ProductManagement from './product-management';
import OrderManagement from './orders-management';

const AdministrationRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="user-management/*" element={<UserManagement />} />
      <Route path="product-management/*" element={<ProductManagement />} />
      <Route path="category-management/*" element={<CategoryManagement />} />
      <Route path="order-management/*" element={<OrderManagement />} />

      {/* Two routes more, one for email and other for contact */}
      <Route path="docs" element={<Docs />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default AdministrationRoutes;

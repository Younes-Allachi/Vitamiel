import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import About from 'app/modules/about/about';
import Question from 'app/modules/questions/questions';
import Contact from 'app/modules/contact/contact';
import CartPage from 'app/modules/cart/cart';
import WishList from 'app/modules/wishlist/wishlist';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

import TawkToWidget from 'app/shared/components/TawkToWidget'; // Import the widget component

const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import('app/modules/account'),
  loading: () => loading,
});

const Admin = Loadable({
  loader: () => import('app/modules/administration'),
  loading: () => loading,
});

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <TawkToWidget />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Home />
              <TawkToWidget />
            </>
          }
        />
        <Route
          path="/logout"
          element={
            <>
              <Logout />
              <TawkToWidget />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About />
              <TawkToWidget />
            </>
          }
        />
        <Route
          path="/question"
          element={
            <>
              <Question />
              <TawkToWidget />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <TawkToWidget />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <CartPage />
              <TawkToWidget />
            </>
          }
        />
        <Route
          path="/wishlist"
          element={
            <>
              <WishList />
              <TawkToWidget />
            </>
          }
        />

        {/* Account Routes */}
        <Route path="account/*">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <>
                  <Account />
                  <TawkToWidget />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="register"
            element={
              <>
                <Register />
                <TawkToWidget />
              </>
            }
          />
          <Route
            path="activate"
            element={
              <>
                <Activate />
                <TawkToWidget />
              </>
            }
          />
          <Route path="reset">
            <Route
              path="request"
              element={
                <>
                  <PasswordResetInit />
                  <TawkToWidget />
                </>
              }
            />
            <Route
              path="finish"
              element={
                <>
                  <PasswordResetFinish />
                  <TawkToWidget />
                </>
              }
            />
          </Route>
        </Route>

        <Route
          path="/admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />

        {/* Catch-all for undefined routes */}
        <Route
          path="*"
          element={
            <>
              <PageNotFound />
              <TawkToWidget />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;

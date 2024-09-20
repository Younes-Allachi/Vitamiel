import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);
  const [showModal, setShowModal] = useState(showModalLogin);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogin = (username: string, password: string, rememberMe = false) => {
    dispatch(login(username, password, rememberMe));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSignup = () => {
    setShowSignupModal(true);
  };

  const openPasswordResetModal = () => {};

  return (
    <>
      <LoginModal
        showModal={showModal}
        handleLogin={handleLogin}
        handleClose={handleClose}
        loginError={loginError}
        isAuthenticated={isAuthenticated}
        handleSignup={handleSignup}
        openPasswordResetModal={openPasswordResetModal}
      />
    </>
  );
};

export default Login;

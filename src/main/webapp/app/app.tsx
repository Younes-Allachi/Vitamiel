import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';

import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession, login } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import LoginModal from 'app/modules/login/login-modal';
import GdprModal from 'app/modules/gdpr/gdpr';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);
  const [scroll, setScroll] = useState<number>(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showGdprModal, setShowGdprModal] = useState<boolean>(false); // New state for GDPR modal visibility.
  const loginError = useAppSelector(state => state.authentication.loginError);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const className = scroll > 80 ? 'fixed-navbar animated fadeInDown active' : 'fixed-navbar';

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(getSession()); // Récupère la session utilisateur
    dispatch(getProfile()); // Récupère le profil utilisateur
  }, []);

  const handleLogin = (username: string, password: string) => {
    dispatch(login(username, password));
  };

  const handleSignup = () => {
    // Logic to handle signup modal (if necessary)
  };

  const openPasswordResetModal = () => {
    // Logic to open password reset modal
  };

  // Handle closing of GDPR modal
  const handleCloseGdprModal = () => {
    setShowGdprModal(false);
  };


  useEffect(() => {
    const consentGiven = localStorage.getItem('gdprConsent');
    if (!consentGiven) {
      setShowGdprModal(true); // Show the GDPR modal if consent is not given.
    }
  }, []);

  return (
    <BrowserRouter basename={baseHref}>
      <div>
        <ToastContainer position="top-left" className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <div className={className}>
            <Header
              hClass={'header-style-1'}
              isAuthenticated={isAuthenticated}
              currentLocale={currentLocale}
              ribbonEnv={ribbonEnv}
              isInProduction={isInProduction}
              isOpenAPIEnabled={isOpenAPIEnabled}
              toggleLoginModal={toggleLoginModal}
            />
          </div>
        </ErrorBoundary>
        <div className="container-fluid view-container" id="app-view-container">
          <Card className="jh-card">
            <AppRoutes />
          </Card>
          <Footer />
        </div>
        <LoginModal
          showModal={showLoginModal}
          handleClose={toggleLoginModal}
          loginError={loginError}
          handleLogin={handleLogin}
          isAuthenticated={isAuthenticated}
          handleSignup={handleSignup}
          openPasswordResetModal={openPasswordResetModal}
        />
        <GdprModal
          showModal={showGdprModal}
          handleClose={handleCloseGdprModal} // Close GDPR modal
        />
      </div>
    </BrowserRouter>
  );
};

export default App;

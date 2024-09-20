import './header.scss';
import React, { useCallback, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Storage, Translate } from 'react-jhipster';
import MobileMenu from 'app/shared/layout/header/MobileMenu';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { LocaleMenu } from 'app/shared/layout/menus';
import RegisterModal from 'app/modules/account/register/RegisterModal';
import LoginModal from 'app/modules/login/login-modal';
import PasswordResetModal from 'app/modules/account/password-reset/PasswordResetModal';
import ProfileModal from 'app/modules/account/settings/ProfileModal/ProfileModal';
import PasswordModal from 'app/modules/account/password/PasswordModal/PasswordModal';
import { login, logout } from 'app/shared/reducers/authentication';
import { saveAccountSettings } from 'app/modules/account/settings/settings.reducer';

interface HeaderProps {
  hClass?: string;
  isAuthenticated: boolean;
  currentLocale?: string;
  ribbonEnv?: string;
  isInProduction?: boolean;
  isOpenAPIEnabled?: boolean;
  toggleLoginModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({ hClass = '', isAuthenticated, currentLocale, toggleLoginModal }) => {
  const [isProfileShow, setIsProfileShow] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const location = useLocation();

  // Récupérer l'état actuel de la langue pour éviter un rerendering excessif
  useEffect(() => {
    if (!isAuthenticated) {
      setIsProfileShow(false);
    }
  }, [isAuthenticated]);

  // Fermer tous les modals en une fois
  const closeAllModals = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
    setShowPasswordResetModal(false);
    setShowProfileModal(false);
    setShowPasswordModal(false);
  };

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));

    // Fermer les modals lorsque la langue change pour éviter tout conflit
    closeAllModals();
  };

  const profileHandler = useCallback(() => {
    setIsProfileShow(prevState => !prevState);
  }, []);

  const closeProfileMenu = () => setIsProfileShow(false);

  const closeProfileModal = () => setShowProfileModal(false);
  const closeRegisterModal = () => setShowRegisterModal(false);

  const openRegisterModal = () => {
    closeAllModals();
    setShowRegisterModal(true);
  };

  const openLoginModal = () => {
    closeAllModals();
    setShowLoginModal(true);
  };

  const openPasswordResetModal = () => {
    closeAllModals();
    setShowPasswordResetModal(true);
  };

  const openProfileModal = () => {
    closeAllModals();
    setShowProfileModal(true);
  };

  const openPasswordModal = () => {
    closeAllModals();
    setShowPasswordModal(true);
  };

  const handleProfileSubmit = values => {
    dispatch(saveAccountSettings({ ...account, ...values }));
    closeProfileModal();
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const isActive = (pathname: string) => location.pathname === pathname;

  const getAccountMenu = isAuthenticated ? (
    <ul className="custom-menu">
      <li className="custom-menu-item2">
        <Link
          to="#"
          id="profile"
          onClick={() => {
            openProfileModal();
            closeProfileMenu();
          }}
        >
          {currentLocale === 'fr' ? 'Profil' : 'Profile'}
        </Link>
      </li>
      <li className="custom-menu-item2">
        <Link
          to="#"
          id="password"
          onClick={() => {
            openPasswordModal();
            closeProfileMenu();
          }}
        >
          {currentLocale === 'fr' ? 'Mot de passe' : 'Password'}
        </Link>
      </li>
      <li className="custom-menu-item2">
        <Link to="#" id="signout" onClick={handleLogout}>
          <Translate contentKey="header.signout">Sign out</Translate>
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="custom-menu">
      <li className="custom-menu-item2">
        <Link
          to="#"
          id="login"
          onClick={() => {
            openLoginModal();
            closeProfileMenu();
          }}
        >
          <Translate contentKey="header.login">Login</Translate>
        </Link>
      </li>
      <li className="custom-menu-item2">
        <Link
          to="#"
          id="signup"
          onClick={() => {
            openRegisterModal();
            closeProfileMenu();
          }}
        >
          <Translate contentKey="header.inscription">Sign up</Translate>
        </Link>
      </li>
    </ul>
  );

  return (
    <header id="header" className={`site-header ${hClass}`}>
      <nav className="navigation navbar navbar-expand-lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="navbar-header">
                <div className="navbar-brand">
                  <img src="content/images/logo.png" alt="icon" /> Vitamiel
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div id="navbar" className="collapse navbar-collapse navigation-holder">
                <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                  <li>
                    <Link className={isActive('/') || isActive('/home') ? 'active' : ''} to="/">
                      <Translate contentKey="header.home">Home</Translate>
                    </Link>
                  </li>
                  <li>
                    <Link className={isActive('/about') ? 'active' : ''} to="/about">
                      <Translate contentKey="header.about">About</Translate>
                    </Link>
                  </li>
                  <LocaleMenu currentLocale={currentLocale} onClick={handleLocaleChange} />
                </ul>
              </div>
            </div>
            <div className="col-lg-2 d-flex align-items-center justify-content-end">
              <div className="header-right d-flex">
                <div className="responsive-locale-menu">
                  <LocaleMenu currentLocale={currentLocale} onClick={handleLocaleChange} />
                </div>
                <div className="header-profile-form-wrapper">
                  <button onClick={profileHandler} className="profile-toggle-btn">
                    <i className={`${isProfileShow ? 'fi ti-close' : 'fi flaticon-user'}`}></i>
                  </button>
                  <div className={`header-profile-content ${isProfileShow ? 'header-profile-content-toggle' : ''}`}>{getAccountMenu}</div>
                  <LoginModal
                    showModal={showLoginModal}
                    handleClose={() => setShowLoginModal(false)}
                    loginError={loginError}
                    handleLogin={(username, password) => dispatch(login(username, password))}
                    isAuthenticated={isAuthenticated}
                    handleSignup={openRegisterModal}
                    openPasswordResetModal={openPasswordResetModal}
                  />
                  <RegisterModal showModal={showRegisterModal} handleClose={closeRegisterModal} />
                  <PasswordResetModal showModal={showPasswordResetModal} handleClose={() => setShowPasswordResetModal(false)} />
                  <ProfileModal
                    showModal={showProfileModal}
                    handleClose={closeProfileModal}
                    handleValidSubmit={handleProfileSubmit}
                    account={account}
                  />
                  <PasswordModal showModal={showPasswordModal} handleClose={() => setShowPasswordModal(false)} />
                </div>
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

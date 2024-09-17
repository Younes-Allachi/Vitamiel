import './header.scss';

import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Storage, Translate } from 'react-jhipster';
import MobileMenu from 'app/shared/layout/header/MobileMenu';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { AccountMenu, LocaleMenu } from 'app/shared/layout/menus';

interface HeaderProps {
  hClass?: string;
  isAuthenticated?: boolean;
  currentLocale?: string;
  ribbonEnv?: string;
  isInProduction?: boolean;
  isOpenAPIEnabled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hClass, currentLocale }) => {
  const [isProfileShow, setIsProfileShow] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };

  const profileHandler = useCallback(() => {
    setIsProfileShow(prevState => !prevState);
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
    setIsProfileShow(prevState => !prevState);
  };
  const getAccountMenu = useMemo(() => {
    return isAuthenticated ? (
      <ul>
        <li>
          <a onClick={ClickHandler} href="/account/password">
            <Translate contentKey="global.menu.account.password">Password</Translate>
          </a>
        </li>
        <li>
          <a onClick={ClickHandler} href="/logout">
            <Translate contentKey="header.signout">Sign out</Translate>
          </a>
        </li>
      </ul>
    ) : (
      <ul>
        <li>
          <Link onClick={ClickHandler} to="/login">
            <Translate contentKey="header.login">Login</Translate>
          </Link>
        </li>
        <li>
          <Link onClick={ClickHandler} to="/account/register">
            <Translate contentKey="header.inscription">Sign up</Translate>
          </Link>
        </li>
      </ul>
    );
  }, [isAuthenticated, currentLocale]);

  return (
    <header id="header" className={`site-header ${hClass}`}>
      <nav className="navigation navbar navbar-expand-lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="navbar-header">
                <Link onClick={ClickHandler} className="navbar-brand" to="/">
                  <img src="content/images/logo.png" alt="icon" /> Vitamiel
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div id="navbar" className="collapse navbar-collapse navigation-holder">
                <Link onClick={ClickHandler} className="menu-close" to="/">
                  <i className="fi flaticon-cancel"></i>
                </Link>
                <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                  <li>
                    <Link onClick={ClickHandler} className="active" to="/">
                      <Translate contentKey="header.home">title</Translate>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/">
                      <Translate contentKey="header.about">title</Translate>
                    </Link>
                  </li>
                  <LocaleMenu currentLocale={currentLocale} onClick={handleLocaleChange} />
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="header-right d-flex">
                <div className="header-profile-form-wrapper">
                  <button onClick={profileHandler} className="profile-toggle-btn">
                    <i className={`${isProfileShow ? 'fi ti-close' : 'fi flaticon-user'}`}></i>
                  </button>
                  <div className={`header-profile-content ${isProfileShow ? 'header-profile-content-toggle' : ''}`}>{getAccountMenu}</div>
                </div>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

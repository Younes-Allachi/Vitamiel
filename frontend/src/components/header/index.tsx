import React, { useState, useCallback } from "react";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu";

interface HeaderProps {
  hClass?: string;
}

const Header: React.FC<HeaderProps> = ({ hClass }) => {
  const [isProfileShow, setIsProfileShow] = useState(false);

  const profileHandler = useCallback(() => {
    setIsProfileShow((prevState) => !prevState);
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <header id="header" className={`site-header ${hClass}`}>
      <nav className="navigation navbar navbar-expand-lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="navbar-header">
                <Link onClick={ClickHandler} className="navbar-brand" to="/">
                  <img src={Logo} alt="icon" /> Vitamiel
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div
                id="navbar"
                className="collapse navbar-collapse navigation-holder"
              >
                <Link onClick={ClickHandler} className="menu-close" to="/">
                  <i className="fi flaticon-cancel"></i>
                </Link>
                <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                  <li>
                    <Link onClick={ClickHandler} className="active" to="/">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/">
                      À propos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="header-right d-flex">
                <div className="header-profile-form-wrapper">
                  <button
                    onClick={profileHandler}
                    className="profile-toggle-btn"
                  >
                    <i
                      className={`${
                        isProfileShow ? "fi ti-close" : "fi flaticon-user"
                      }`}
                    ></i>
                  </button>
                  <div
                    className={`header-profile-content ${
                      isProfileShow ? "header-profile-content-toggle" : ""
                    }`}
                  >
                    <ul>
                      <li>
                        <Link onClick={ClickHandler} to="#">
                          Connexion
                        </Link>
                      </li>
                      <li>
                        <Link onClick={ClickHandler} to="#">
                          Inscription
                        </Link>
                      </li>
                    </ul>
                  </div>
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

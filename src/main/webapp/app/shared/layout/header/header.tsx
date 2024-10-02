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
import { removeFromCart, removeFromWishList } from 'app/shared/actions/action';
import { totalPrice } from '../../../shared/util/lists';
import '../../../../content/sass/components/_buttons.scss';

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
  const [isCartShow, setIsCartShow] = useState(false);
  const [isWishlistShow, setIsWishlistShow] = useState(false);

  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const carts = useAppSelector(state => state.cartList?.cart) || []; // Par défaut, un tableau vide
  const wishs = useAppSelector(state => state.wishList?.w_list) || []; // Par défaut, un tableau vide
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsProfileShow(false);
    }
  }, [isAuthenticated]);

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
    closeAllModals();
  };

  const profileHandler = useCallback(() => {
    setIsProfileShow(prevState => !prevState);
  }, []);

  const cartHandler = () => {
    setIsCartShow(!isCartShow);
  };

  const wishlistHandler = () => {
    setIsWishlistShow(!isWishlistShow);
  };

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

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem('cartList', JSON.stringify(carts));
    } else {
      localStorage.removeItem('cartList');
    }
  }, [carts]);

  useEffect(() => {
    if (wishs.length > 0) {
      localStorage.setItem('wishList', JSON.stringify(wishs));
    } else {
      localStorage.removeItem('wishList');
    }
  }, [wishs]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartList');
    if (storedCart) {
      dispatch({ type: 'cartList/setCart', payload: JSON.parse(storedCart) });
    }

    const storedWishList = localStorage.getItem('wishList');
    if (storedWishList) {
      dispatch({ type: 'wishList/setWishList', payload: JSON.parse(storedWishList) });
    }
  }, [dispatch]);

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
                <Link to="/">
                  <div className="navbar-brand">
                    <img src="content/images/logo.png" alt="icon" /> Vitamiel
                  </div>
                </Link>
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
                  <li>
                    <Link className={isActive('/contact') ? 'active' : ''} to="/contact">
                      <Translate contentKey="header.contact">Contact</Translate>
                    </Link>
                  </li>
                  <li>
                    <Link className={isActive('/cart') ? 'active' : ''} to="/cart">
                      <Translate contentKey="header.cart">Cart</Translate>
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
                <div className="mini-cart">
                  <button onClick={cartHandler} className="cart-toggle-btn">
                    <i className="fi flaticon-bag"></i> <span className="cart-count">{carts.length}</span>
                  </button>
                  <div className={`mini-cart-content ${isCartShow ? 'mini-cart-content-toggle' : ''}`}>
                    <button onClick={cartHandler} className="mini-cart-close">
                      <i className="ti-close"></i>
                    </button>
                    <div className="mini-cart-items">
                      {carts &&
                        carts.length > 0 &&
                        carts.map((cart, index) => (
                          <div className="mini-cart-item clearfix" key={index}>
                            <div className="mini-cart-item-image">
                              <span>
                                <img src={cart.proImg} alt="icon" />
                              </span>
                            </div>
                            <div className="mini-cart-item-des">
                              <p>
                                <Translate contentKey={`product.title3.${cart.id}`}>{cart.title}</Translate>
                              </p>
                              <span className="mini-cart-item-price">
                                ${cart.price} x {cart.qty}
                              </span>
                              <button onClick={() => dispatch(removeFromCart(cart.id))} className="btn btn-sm btn-danger">
                                <i className="ti-close"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="mini-cart-action clearfix">
                      <span className="mini-checkout-price">
                        <Translate contentKey="cart.total">Total</Translate>: ${totalPrice(carts)}
                      </span>
                      <div className="mini-btn">
                        <Link to="#" className="view-cart-btn s1">
                          <Translate contentKey="cart.checkout">Checkout</Translate>
                        </Link>
                        <Link to="/cart" className="view-cart-btn">
                          <Translate contentKey="cart.viewCart">View Cart</Translate>
                        </Link>
                      </div>
                    </div>
                    <div className="visible-icon">
                      <img src="../../../../content/images/shop/mini-cart/bee2.png" alt="icon" />
                    </div>
                  </div>
                </div>
                <div className="header-wishlist-form-wrapper">
                  <button onClick={wishlistHandler} className="wishlist-toggle-btn">
                    <i className="fi flaticon-heart"></i> <span className="cart-count">{wishs.length}</span>
                  </button>
                  <div className={`mini-wislist-content ${isWishlistShow ? 'mini-cart-content-toggle' : ''}`}>
                    <button onClick={wishlistHandler} className="mini-cart-close">
                      <i className="ti-close"></i>
                    </button>
                    <div className="mini-cart-items">
                      {wishs &&
                        wishs.length > 0 &&
                        wishs.map((wish, index) => (
                          <div className="mini-cart-item clearfix" key={index}>
                            <div className="mini-cart-item-image">
                              <span>
                                <img src={wish.proImg} alt="icon" />
                              </span>
                            </div>
                            <div className="mini-cart-item-des">
                              <p>
                                <Translate contentKey={`product.title3.${wish.id}`}>{wish.title}</Translate>
                              </p>
                              <span className="mini-cart-item-price">${wish.price}</span>
                              <button onClick={() => dispatch(removeFromWishList(wish.id))} className="btn btn-sm btn-danger">
                                <i className="ti-close"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="mini-cart-action clearfix">
                      <span className="mini-checkout-price">
                        <Translate contentKey="cart.total">Total</Translate>: ${totalPrice(wishs)}
                      </span>
                      <div className="mini-btn">
                        <Link to="#" className="view-cart-btn s1">
                          <Translate contentKey="cart.checkout">Checkout</Translate>
                        </Link>
                        <Link to="#" className="view-cart-btn">
                          <Translate contentKey="cart.viewWishlist">View Wishlist</Translate>
                        </Link>
                      </div>
                    </div>
                    <div className="visible-icon">
                      <img src="../../../../content/images/shop/mini-cart/bee2.png" alt="icon" />
                    </div>
                  </div>
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

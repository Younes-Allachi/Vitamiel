import './footer.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const ClickHandler = (e: React.MouseEvent) => {
  e.preventDefault();
};

const Footer = () => (
  <footer className="tp-site-footer">
    <div className="tp-upper-footer">
      <div className="container">
        <div className="row">
          <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
            <div className="widget about-widget">
              <div className="logo widget-title">
                <div onClick={ClickHandler} style={{ textDecoration: 'none' }}>
                  <img src="content/images/logo.png" alt="ft-logo" className="logo-image" /> Vitamiel
                </div>
              </div>
              <p>
                <Translate contentKey="footer.title" />
              </p>
              <ul>
                <li>
                  <Link onClick={ClickHandler} to="#">
                    <i className="ti-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link onClick={ClickHandler} to="#">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </Link>
                </li>
                <li>
                  <Link onClick={ClickHandler} to="#">
                    <i className="ti-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link onClick={ClickHandler} to="#">
                    <i className="ti-google"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
            <div className="widget tp-service-link-widget">
              <div className="widget-title">
                <h3>
                  <Translate contentKey="footer.contact.title" />
                </h3>
              </div>
              <div className="contact-ft">
                <ul>
                  <li>
                    <i className="fi flaticon-pin"></i>
                    <Translate contentKey="footer.contact.address" />
                  </li>
                  <li>
                    <i className="fi flaticon-call"></i>+1 800 123 456 789
                  </li>
                  <li>
                    <i className="fi flaticon-envelope"></i>Vitamiel@gmail.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
            <div className="widget newsletter-widget">
              <div className="widget-title">
                <h3>
                  <Translate contentKey="footer.newsletter.title" />
                </h3>
              </div>
              <p>
                <Translate contentKey="footer.newsletter.description" />
              </p>
              <form>
                <div className="input-1">
                  <input type="email" className="form-control" placeholder={translate('global.form.email.placeholder')} required />
                </div>
                <div className="submit clearfix">
                  <button type="submit">
                    <i className="ti-email"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="tp-lower-footer">
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <p className="copyright">
              Copyright &copy;
              <Translate contentKey="footer.copyright" />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-shape1">
      <i className="fi flaticon-honeycomb"></i>
    </div>
    <div className="footer-shape2">
      <i className="fi flaticon-honey-1"></i>
    </div>
  </footer>
);

export default Footer;

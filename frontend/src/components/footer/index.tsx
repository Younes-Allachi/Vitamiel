import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";

const Footer: React.FC = () => {
  const ClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="tp-site-footer">
      <div className="tp-upper-footer">
        <div className="container">
          <div className="row">
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Link onClick={ClickHandler} to="/">
                    <img src={Logo} alt="ft-logo" /> Vitamiel
                  </Link>
                </div>
                <p>
                  Le conseil en management inclut un large éventail d'activités,
                  et les nombreuses entreprises et leurs membres définissent
                  souvent ces pratiques.
                </p>
                <ul>
                  <li>
                    <Link onClick={ClickHandler} to="#">
                      <i className="ti-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="#">
                      <i className="ti-twitter-alt"></i>
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
                  <h3>Contact</h3>
                </div>
                <div className="contact-ft">
                  <ul>
                    <li>
                      <i className="fi flaticon-pin"></i>7 Rue Green Lake, 47933
                    </li>
                    <li>
                      <i className="fi flaticon-call"></i>+1 800 123 456 789
                    </li>
                    <li>
                      <i className="fi flaticon-envelope"></i>
                      Vitamiel@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget newsletter-widget">
                <div className="widget-title">
                  <h3>Newsletter</h3>
                </div>
                <p>Vous serez notifié lorsqu'une nouveauté apparaîtra.</p>
                <form>
                  <div className="input-1">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Adresse Email *"
                      required
                    />
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
                Copyright &copy; 2024 Vitamiel. Tous droits réservés.
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
};

export default Footer;

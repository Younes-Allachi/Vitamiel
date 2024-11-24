import './footer.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faSnapchat, faTiktok } from '@fortawesome/free-brands-svg-icons'; // Import new icons

const ClickHandler = (e: React.MouseEvent) => {
  e.preventDefault();
};

const saveEmail = async (email) => {
  console.log('Email before send:',email)
  try {
    const response = await fetch('http://localhost:8080/api/useremail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Send email in JSON format
    });

    const data = await response.json();
    console.log('Email saved:', data);
  } catch (error) {
    console.error('Error saving email:', error);
  }
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError(''); // Clear any previous error
    saveEmail(email); // Call the saveEmail function to send the email
    setEmail(''); 
  };

  return (
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
                    <Link to="https://www.facebook.com/profile.php?id=61566039371306" target='_blank'>
                      <i className="ti-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://x.com/VitamielBelgium" target='_blank'>
                      <FontAwesomeIcon icon={faXTwitter} />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.instagram.com/vitamiel_belgium" target='_blank'>
                      <i className="ti-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.snapchat.com/add/vitamielbelgium" target='_blank'> 
                      <FontAwesomeIcon icon={faSnapchat} />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.tiktok.com/@vitamiel_belgium" target='_blank'> 
                      <FontAwesomeIcon icon={faTiktok} />
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
                      <i className="fi flaticon-call"></i>+32 484 161 363
                    </li>
                    <li>
                      <i className="fi flaticon-envelope"></i>Vitamiel.be@gmail.com
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
                <form onSubmit={handleSubmit}>
                  <div className="input-1">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={translate('global.form.email.placeholder')}
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    {emailError && <p className="error-text">{emailError}</p>}
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
};

export default Footer;

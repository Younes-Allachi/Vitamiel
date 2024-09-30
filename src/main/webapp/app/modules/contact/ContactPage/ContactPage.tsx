import React from 'react';
import { Translate } from 'react-jhipster';
import ContactForm from '../ContactForm/ContactForm';
import './ContactPage.scss';

const Contactpage: React.FC = () => {
  return (
    <section className="contact-pg-contact-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-6 col-12">
            <div className="section-title-s3 section-title-s5">
              <h2>
                <Translate contentKey="contact.title">Our Contacts</Translate>
              </h2>
            </div>
            <div className="contact-details">
              <p>
                <Translate contentKey="contact.description">
                  At Vitamiel, we are committed to providing the highest quality natural honey directly from our apiaries in Belgium. Our
                  team is always here to answer any of your questions or assist you in selecting the right product for your needs.
                </Translate>
              </p>
              <ul>
                <li>
                  <div className="icon">
                    <i className="ti-location-pin"></i>
                  </div>
                  <h5>
                    <Translate contentKey="contact.location.title">Our Location</Translate>
                  </h5>
                  <p>
                    <Translate contentKey="contact.location.address">Vlezenbeeklaan 171A, 1602 Sint-Pieters-Leeuw, Belgium</Translate>
                  </p>
                </li>
                <li>
                  <div className="icon">
                    <i className="ti-mobile"></i>
                  </div>
                  <h5>
                    <Translate contentKey="contact.phone.title">Phone</Translate>
                  </h5>
                  <p>
                    <Translate contentKey="contact.phone.number">+32 484 161 363</Translate>
                  </p>
                </li>
                <li>
                  <div className="icon">
                    <i className="ti-email"></i>
                  </div>
                  <h5>
                    <Translate contentKey="contact.email.title">Email</Translate>
                  </h5>
                  <p>
                    <Translate contentKey="contact.email.address">vitamiel.be@gmail.com</Translate>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="contact-form-area">
              <div className="section-title-s3 section-title-s5">
                <h2>
                  <Translate contentKey="contact.formTitle">Quick Contact Form</Translate>
                </h2>
              </div>
              <div className="contact-form">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-xs-12">
            <div className="contact-map">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.531243618365!2d4.2325989!3d50.8074152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c7a123540001%3A0x1081a89fd83bd4e3!2sVlezenbeeklaan%20171a%2C%201602%20Sint-Pieters-Leeuw%2C%20Belgium!5e0!3m2!1sfr!2sbe!4v1694567606603!5m2!1sfr!2sbe"
                style={{ border: 0, width: '100%', height: '450px' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactpage;

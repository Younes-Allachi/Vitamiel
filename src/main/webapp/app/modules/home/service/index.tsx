import React from 'react';
import { Translate } from 'react-jhipster'; // Pour utiliser la traduction
import './service.scss';

const Service: React.FC = () => {
  return (
    <div className="service-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img draggable="false" src="../../../../content/images/support/1.png" alt="Livraison Gratuite" />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>
                  <Translate contentKey="service.freeShipping.title" />
                </h2>
                <span>
                  <Translate contentKey="service.freeShipping.description" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img draggable="false" src="../../../../content/images/support/2.png" alt="Paiement Facile" />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>
                  <Translate contentKey="service.easyPayment.title" />
                </h2>
                <span>
                  <Translate contentKey="service.easyPayment.description" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img draggable="false" src="../../../../content/images/support/3.png" alt="Support 24/7" />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>
                  <Translate contentKey="service.support.title" />
                </h2>
                <span>
                  <Translate contentKey="service.support.description" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

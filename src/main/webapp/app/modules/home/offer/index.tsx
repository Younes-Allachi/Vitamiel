import React from 'react';
import { Translate } from 'react-jhipster'; // Utiliser Translate pour i18n
import './offer.scss';

const Offer: React.FC = () => {
  return (
    <section className="offer-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="offer-img">
              <img src="../../../../content/images/honey.png" alt="Offre Miel de Tournesol" />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="offer-wrap">
              <div className="offer-title">
                <small>
                  <Translate contentKey="offer.limited" /> {/* Offre limitée pour les clients */}
                </small>
                <h2>
                  <Translate contentKey="offer.title" />{' '}
                  <span style={{ color: '#b83806' }}>
                    <Translate contentKey="offer.subtitle" /> {/* Frais et Original */}
                  </span>
                  <br />
                  <Translate contentKey="offer.discount" /> {/* Jusqu'à 58% de réduction */}
                </h2>
              </div>
              <p>
                <Translate contentKey="offer.description" /> {/* Description de l'offre */}
              </p>
              <p>
                <Translate contentKey="offer.stockWarning" /> {/* Faites vos stocks avant la fin de cette offre */}
              </p>
              <a href="#" className="btn theme-btn" onClick={e => e.preventDefault()}>
                <Translate contentKey="offer.buyNow" /> {/* Achetez Maintenant */}
                <i className="fa fa-angle-double-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;

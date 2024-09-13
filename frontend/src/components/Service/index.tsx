import serviceimg from "../../images/support/1.png";
import serviceimg2 from "../../images/support/2.png";
import serviceimg3 from "../../images/support/3.png";

const Service: React.FC = () => {
  return (
    <div className="service-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img
                    draggable="false"
                    src={serviceimg}
                    alt="Livraison Gratuite"
                  />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>Livraison Gratuite</h2>
                <span>Pour toute commande supérieure à 560€</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img
                    draggable="false"
                    src={serviceimg2}
                    alt="Paiement Facile"
                  />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>Paiement Facile</h2>
                <span>Paiement 100% Sécurisé</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img draggable="false" src={serviceimg3} alt="Support 24/7" />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>Support 24/7</h2>
                <span>Support à tout moment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

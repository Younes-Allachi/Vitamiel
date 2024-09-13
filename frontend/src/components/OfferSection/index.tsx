import abimg from "../../images/honey.png";

const OfferSection: React.FC = () => {
  return (
    <section className="offer-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="offer-img">
              <img src={abimg} alt="Offre Miel de Tournesol" />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="offer-wrap">
              <div className="offer-title">
                <small>Offre limitée pour les clients</small>
                <h2>
                  Miel de Tournesol <span>Frais et Original</span> <br />{" "}
                  Jusqu'à 58% de réduction.
                </h2>
              </div>
              <p>
                Ne manquez pas notre promotion spéciale ! Notre Miel de
                Tournesol frais est maintenant disponible à un prix imbattable.
                Connu pour sa saveur légère et florale, ce miel est parfait pour
                sublimer vos plats préférés ou à déguster tel quel. <br />
                <br /> Faites vos stocks avant la fin de cette offre à durée
                limitée.
              </p>
              <a
                href="#"
                className="btn theme-btn"
                onClick={(e) => e.preventDefault()}
              >
                Achetez Maintenant <i className="fa fa-angle-double-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;

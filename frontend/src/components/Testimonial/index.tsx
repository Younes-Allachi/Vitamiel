import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import test1 from "../../images/testimonial/1.png";
import test2 from "../../images/testimonial/3.png";
import test3 from "../../images/testimonial/2.png";

const Testimonial: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
  };

  return (
    <section className="testimonial-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title">
              <h2>
                Témoignages <span>Clients</span>
              </h2>
              <p>
                Nos clients adorent notre miel, et voici ce qu'ils disent de
                leur expérience avec nos produits. De la qualité au goût, notre
                miel laisse une impression durable !
              </p>
            </div>
          </div>
        </div>
        <div className="testimonial-wrap">
          <div className="testimonial-active">
            <Slider {...settings}>
              <div className="testimonial-item">
                <div className="testimonial-img">
                  <img src={test1} alt="Témoignage Rachel Matthews" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    "Le miel que j'ai reçu était absolument fantastique ! Je
                    n'ai jamais goûté un miel aussi pur et frais. Il a
                    complètement transformé mon thé du matin. Je le recommande
                    vivement !"
                  </p>
                  <div className="testimonial-author">
                    <h3>Rachel Matthews</h3>
                    <span>PDG, Deixfes</span>
                  </div>
                  <div className="t-content-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-img">
                  <img src={test2} alt="Témoignage David Warner" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    "J'ai essayé plusieurs types de miel, mais celui-ci se
                    démarque par sa saveur riche et sa texture douce. C'est le
                    complément parfait pour mes desserts, et j'adore son goût
                    naturel."
                  </p>
                  <div className="testimonial-author">
                    <h3>David Warner</h3>
                    <span>PDG, TBR</span>
                  </div>
                  <div className="t-content-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-img">
                  <img src={test3} alt="Témoignage Ken Williamson" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    "Ce miel est tout simplement incroyable. La qualité est
                    exceptionnelle et je ne peux plus imaginer revenir au miel
                    acheté en magasin. Il est parfait pour la cuisine et pour
                    sucrer mes boissons."
                  </p>
                  <div className="testimonial-author">
                    <h3>Ken Williamson</h3>
                    <span>PDG, Bexim</span>
                  </div>
                  <div className="t-content-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

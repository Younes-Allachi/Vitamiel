import React from 'react';
import { Translate } from 'react-jhipster'; // Utilisation de react-jhipster pour l'i18n
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './testimonial.scss';

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
                <span style={{ color: '#b83806' }}>
                  <Translate contentKey="testimonial.title" />{' '}
                </span>
                <span>
                  <Translate contentKey="testimonial.clients" />
                </span>
              </h2>
              <p>
                <Translate contentKey="testimonial.description" />
              </p>
            </div>
          </div>
        </div>
        <div className="testimonial-wrap">
          <div className="testimonial-active">
            <Slider {...settings}>
              <div className="testimonial-item">
                <div className="testimonial-img">
                  <img src="../../../../content/images/testimonial/1.png" alt="Témoignage Rachel Matthews" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    <Translate contentKey="testimonial.rachelQuote" />
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
                  <img src="../../../../content/images/testimonial/2.png" alt="Témoignage David Warner" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    <Translate contentKey="testimonial.davidQuote" />
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
                  <img src="../../../../content/images/testimonial/3.png" alt="Témoignage Ken Williamson" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    <Translate contentKey="testimonial.kenQuote" />
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

import React from 'react';
import { Translate } from 'react-jhipster';
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
                  <img src="../../../../content/images/testimonial/1.jpeg" alt="Cédric Verhoeven" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    <Translate contentKey="testimonial.rachelQuote" />
                  </p>
                  <div className="testimonial-author">
                    <h3>Cédric Verhoeven</h3>
                    <span>Dataclean</span>
                  </div>
                  <div className="t-content-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-img">
                  <img src="../../../../content/images/testimonial/2.jpeg" alt="Désiré Mbala" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    <Translate contentKey="testimonial.davidQuote" />
                  </p>
                  <div className="testimonial-author">
                    <h3>Désiré Mbala</h3>
                    <span>Mutualité Chrétienne</span>
                  </div>
                  <div className="t-content-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-img">
                  <img src="../../../../content/images/testimonial/3.jpeg" alt="Rachida Bensallam" />
                  <div className="t-quote">
                    <i className="fi flaticon-left-quote"></i>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>
                    <Translate contentKey="testimonial.kenQuote" />
                  </p>
                  <div className="testimonial-author">
                    <h3>Rachida Bensallam</h3>
                    <span>BNP Paribas Fortis</span>
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

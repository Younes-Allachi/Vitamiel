import React from 'react';
import { Translate } from 'react-jhipster';
import './hero.scss';

const Hero: React.FC = () => {
  return (
    <section className="hero hero-style-1">
      <div className="hero-slider">
        <div className="slide">
          <div className="container">
            <div className="row">
              <div className="col col-lg-5 slide-caption">
                <div className="slide-title">
                  <h2>
                    <span>
                      <Translate contentKey="hero.miel" />
                    </span>{' '}
                    100%{' '}
                    <span>
                      <br />
                      <Translate contentKey="hero.fresh" />
                    </span>
                  </h2>
                </div>
                <div className="btns">
                  <a href="#" className="btn theme-btn" onClick={e => e.preventDefault()}>
                    <Translate contentKey="hero.buyNow" /> <i className="fa fa-angle-double-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="right-image">
            <div className="simg-1">
              <img src="content/images/slider/img-1.png" alt="slide-img" />
            </div>
            <div className="simg-2">
              <img src="content/images/slider/img-2.png" alt="slide-img" />
            </div>
          </div>
          <div className="hero-shape-img">
            <img src="content/images/slider/img-3.png" alt="slide-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

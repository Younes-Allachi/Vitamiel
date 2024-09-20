import React from 'react';
import { Translate } from 'react-jhipster';
import './aboutSection.scss';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section section-padding p-t-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col col-lg-5 col-12">
            <div className="video-area">
              <img src="../../../../content/images/abou2.jpg" alt="About us" />
            </div>
          </div>
          <div className="col col-lg-7 col-12">
            <div className="about-area">
              <div className="about-wrap">
                <br />
                <br />
                <div className="about-title">
                  <small>
                    <Translate contentKey="aboutSection.smallTitle" />
                  </small>
                  <h2>
                    <Translate contentKey="aboutSection.mainTitle.part1" />{' '}
                    <span style={{ color: '#b83806' }}>
                      <Translate contentKey="aboutSection.mainTitle.part2" />
                    </span>{' '}
                    <Translate contentKey="aboutSection.mainTitle.part3" />
                  </h2>
                </div>
                <p>
                  <Translate contentKey="aboutSection.paragraph1" />
                  <br />
                  <br />
                  <Translate contentKey="aboutSection.paragraph2" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

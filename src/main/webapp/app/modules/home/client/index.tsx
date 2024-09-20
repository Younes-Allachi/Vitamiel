import React from 'react';
import './client.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ClientProps {
  className?: string;
}

const Client: React.FC<ClientProps> = () => {
  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="client-area">
      <div className="container">
        <div className="client-item">
          <div className="client-carousel">
            <Slider {...settings}>
              <img src="../../../../content/images/client/img-1.png" alt="client" />
              <img src="../../../../content/images/client/img-2.png" alt="client" />
              <img src="../../../../content/images/client/img-3.png" alt="client" />
              <img src="../../../../content/images/client/img-4.png" alt="client" />
              <img src="../../../../content/images/client/img-5.png" alt="client" />
              <img src="../../../../content/images/client/img-1.png" alt="client" />
              <img src="../../../../content/images/client/img-2.png" alt="client" />
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Client;

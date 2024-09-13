import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import client1 from "../../images/client/img-1.png";
import client2 from "../../images/client/img-2.png";
import client3 from "../../images/client/img-3.png";
import client4 from "../../images/client/img-4.png";
import client5 from "../../images/client/img-5.png";

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
              <img src={client1} alt="client" />
              <img src={client2} alt="client" />
              <img src={client3} alt="client" />
              <img src={client4} alt="client" />
              <img src={client5} alt="client" />
              <img src={client1} alt="client" />
              <img src={client2} alt="client" />
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Client;

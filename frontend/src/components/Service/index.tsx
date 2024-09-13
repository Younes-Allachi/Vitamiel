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
                  <img draggable="false" src={serviceimg} alt="Free Shipping" />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>Free Shipping</h2>
                <span>Order Over $560</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img draggable="false" src={serviceimg2} alt="Easy Payment" />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>Easy Payment</h2>
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="service-item">
              <div className="service-icon">
                <span>
                  <img draggable="false" src={serviceimg3} alt="24/7 Support" />
                </span>
              </div>
              <div className="service-icon-text">
                <h2>24/7 Support</h2>
                <span>Anytime Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

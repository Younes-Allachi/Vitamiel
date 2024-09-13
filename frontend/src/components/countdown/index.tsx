import CountDown from "reactjs-countdown";

const Offer: React.FC = () => {
  return (
    <div className="offer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="countdownwrap">
              <CountDown deadline="Nov 22, 2024" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

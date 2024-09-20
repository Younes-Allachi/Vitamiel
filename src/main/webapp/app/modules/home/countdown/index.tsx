import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';
import './countdown.scss';

const Offer: React.FC = () => {
  const period = (2 * 24 + 4) * 60 * 60 * 1000;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const nextResetTime = Math.floor(now / period) * period + period;
    const difference = nextResetTime - now;

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="offer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="countdownwrap">
              <div className="countdown-item">
                <span style={{ color: '#b83806', fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.days}</span>
                <small>
                  <Translate contentKey="countdown.days" />
                </small>
              </div>
              <div className="countdown-item">
                <span style={{ color: '#b83806', fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.hours}</span>
                <small>
                  <Translate contentKey="countdown.hours" />
                </small>
              </div>
              <div className="countdown-item">
                <span style={{ color: '#b83806', fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.minutes}</span>
                <small>
                  <Translate contentKey="countdown.minutes" />
                </small>
              </div>
              <div className="countdown-item">
                <span style={{ color: '#b83806', fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.seconds}</span>
                <small>
                  <Translate contentKey="countdown.seconds" />
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

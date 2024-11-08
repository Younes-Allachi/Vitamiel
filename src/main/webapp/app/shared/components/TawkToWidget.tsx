import React, { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/672a83a04304e3196adda7f0/1ibv14aue';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkToWidget;

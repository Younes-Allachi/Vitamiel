import React from 'react';
import Contactpage from 'app/modules/contact/ContactPage/ContactPage';
import Scrollbar from 'app/modules/home/scrollbar';

const Contact: React.FC = () => {
  return (
    <>
      <div id="top"></div>
      <br />
      <Contactpage />
      <Scrollbar />
    </>
  );
};

export default Contact;

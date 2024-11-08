import React from 'react';
import AboutSection from './aboutSection';
import Scrollbar from 'app/modules/home/scrollbar';

const Questions: React.FC = () => {
  return (
    <>
      <div id="top"></div>
      <AboutSection />
      <Scrollbar />
    </>
  );
};

export default Questions;

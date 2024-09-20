import React from 'react';
import AboutSection from 'app/modules/about/aboutSection';
import Category2 from 'app/modules/about/category2';
import Scrollbar from 'app/modules/home/scrollbar';

const About: React.FC = () => {
  return (
    <>
      <div id="top"></div>
      <AboutSection />
      <Category2 StyleClass={'style-2'} />
      <Scrollbar />
    </>
  );
};

export default About;

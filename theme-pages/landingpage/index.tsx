import React from 'react';
import PageContainer from '../../src/theme-components/container/PageContainer';

// components
import Banner from '../../src/theme-components/landingpage/banner/Banner';
import C2a from '../../src/theme-components/landingpage/c2a/C2a';
import C2a2 from '../../src/theme-components/landingpage/c2a/C2a2';
import DemoSlider from '../../src/theme-components/landingpage/demo-slider/DemoSlider';
import Features from '../../src/theme-components/landingpage/features/Features';
import Footer from '../../src/theme-components/landingpage/footer/Footer';
import Frameworks from '../../src/theme-components/landingpage/frameworks/Frameworks';
import LpHeader from '../../src/theme-components/landingpage/header/Header';
import Testimonial from '../../src/theme-components/landingpage/testimonial/Testimonial';

const Landingpage = () => {
  return (
    <PageContainer>
      <LpHeader />
      <Banner />
      <DemoSlider />
      <Frameworks />
      <Testimonial />
      <Features />
      <C2a />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

Landingpage.layout = "Blank";
export default Landingpage;

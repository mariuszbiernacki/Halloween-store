import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import styled from "styled-components";
import bgImage1 from "../../assets/images/bg1.jpg";
import bgImage2 from "../../assets/images/bg2.jpg";
import bgImage3 from "../../assets/images/bg3.jpg";

const SliderImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Slider = () => {
  return (
    <AwesomeSlider>
      <div>
        <SliderImg src={bgImage1} alt="bgImage1" />
      </div>
      <div>
        <SliderImg src={bgImage2} alt="bgImage2" />
      </div>
      <div>
        <SliderImg src={bgImage3} alt="bgImage3" />
      </div>
    </AwesomeSlider>
  );
};

export default Slider;

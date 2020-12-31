import React from "react";
import Map from "../../libraryComponents/Map/Map";
import Img from "../../styledComponents/Img";
import AboutSectionImg from "../../assets/images/1_witch.jpg";
import AboutSectionImg2 from "../../assets/images/2_zombie.jpg";
import { AboutH2, AboutH3, AboutDiv, AboutP } from "./StyledAbout";

const About = () => {
  return (
    <>
      <AboutH2>About our store</AboutH2>
      <AboutH3>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ex
        nemo corrupti corporis possimus a provident, sed quo eius magnam hic
        veritatis autem eligendi quae odio fuga commodi molestiae quod?
      </AboutH3>
      <AboutDiv>
        <Img src={AboutSectionImg} alt="about1" />
        <AboutP>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
          consectetur vel maiores. Similique quas maxime soluta saepe corporis
          eligendi eius?
        </AboutP>
      </AboutDiv>
      <AboutDiv>
        <AboutP>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
          consectetur vel maiores. Similique quas maxime soluta saepe corporis
          eligendi eius?
        </AboutP>
        <Img src={AboutSectionImg2} alt="about2" />
      </AboutDiv>
      <Map />
    </>
  );
};

export default About;

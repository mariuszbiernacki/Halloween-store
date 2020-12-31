import React, { useContext } from "react";
import styled from "styled-components";
import Slider from "../../libraryComponents/Slider/Slider";
import { Link } from "react-router-dom";
import StoreContext from "../../contexts/StoreContext/StoreContext";

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomeLink = styled(Link)`
  font-size: 60px;
  text-transform: uppercase;
  text-decoration: none;
  color: black;
`;

const HomeH1 = styled.h1`
  font-size: 50px;
  text-transform: uppercase;
  color: orange;
  margin: 30px;
`;

const HomeBtn = styled.button`
  margin: 60px;
  padding: 30px;
  font-size: 60px;
  background-color: orange;
  border-radius: 40px;
  border: 2px solid black;
`;

const Home = () => {
  const value = useContext(StoreContext);
  const { welcomeSlogan } = value;
  return (
    <HomeDiv>
      <HomeH1>{welcomeSlogan}</HomeH1>
      <Slider />
      <HomeBtn>
        <HomeLink to="/Products">Products</HomeLink>
      </HomeBtn>
    </HomeDiv>
  );
};

export default Home;

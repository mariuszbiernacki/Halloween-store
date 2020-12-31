import React from "react";
import GetProductList from "../../components/GetProductList/GetProductList";
import styled from "styled-components";
import FilterMenu from "../../components/FilterMenu/FilterMenu";

const TitleStyle = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: orange;
  background-color: black;
  font-size: 30px;
`;

const Products = () => {
  return (
    <>
      <TitleStyle>Haloween costumes</TitleStyle>
      <FilterMenu />
      <GetProductList />
    </>
  );
};

export default Products;

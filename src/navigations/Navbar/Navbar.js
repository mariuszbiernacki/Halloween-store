import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StoreContext from "../../contexts/StoreContext/StoreContext";

const NavList = styled.ul`
  background-color: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  list-style: none;
  font-family: sans-serif;
  margin-bottom: 50px;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 13px 20px;
  color: white;
  text-decoration: none;
`;

const CartBtn = styled.button`
  background-color: white;
  color: black;
  padding: 12px;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
`;

const Navbar = () => {
  const value = useContext(StoreContext);

  const { handleCartOpen, cartCounter, clearHomeInterval } = value;
  return (
    <NavList>
      <NavItem key="home">
        <NavLink onClick={clearHomeInterval} to="/">
          Home
        </NavLink>
      </NavItem>
      <NavItem key="about">
        <NavLink onClick={clearHomeInterval} to="/About">
          About
        </NavLink>
      </NavItem>
      <NavItem key="products">
        <NavLink onClick={clearHomeInterval} to="/Products">
          Products
        </NavLink>
      </NavItem>
      <NavItem key="contact">
        <NavLink onClick={clearHomeInterval} to="/Contact">
          Contact
        </NavLink>
      </NavItem>
      <CartBtn
        type="button"
        onClick={() => {
          handleCartOpen();
          clearHomeInterval();
        }}
      >
        <p>{cartCounter}</p>
      </CartBtn>
    </NavList>
  );
};

export default Navbar;

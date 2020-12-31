import React from "react";
import Navbar from "../../navigations/Navbar/Navbar";
import Cart from "../../components/Cart/Cart";

const StoreTemplate = ({ children }) => {
  return (
    <>
      <Navbar />
      <Cart />
      {children}
    </>
  );
};

export default StoreTemplate;

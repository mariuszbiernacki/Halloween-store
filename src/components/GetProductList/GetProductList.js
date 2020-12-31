import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../../contexts/StoreContext/StoreContext";
import styled from "styled-components";
import Img from "../../styledComponents/Img";
import List from "../../styledComponents/List";
import Item from "../../styledComponents/Item";
import Btn from "../../styledComponents/Btn";

const ProductH2 = styled.h2`
  margin-bottom: 5px;
`;
const ProductH3 = styled.h3`
  margin-bottom: 5px;
`;

const GetProductList = () => {
  const value = useContext(StoreContext);
  const {
    seeSingleProduct,
    filteredProducts,
    addProductToCart,
    increaseCartCounter,
    increaseProductQuantity,
    calculateTotal,
  } = value;
  return (
    <>
      <List>
        {filteredProducts.map((product) => {
          const { productName, productPrice } = product;
          return (
            <Item key={productName}>
              <Link to="/SingleProduct">
                <Img
                  onClick={() => seeSingleProduct(productName)}
                  src={product.productImage.fields.file.url}
                  alt="product-image"
                />
              </Link>
              <ProductH2>{productName}</ProductH2>
              <ProductH3>{productPrice} PLN</ProductH3>
              <Btn
                onClick={() => {
                  addProductToCart(productName);
                  increaseCartCounter();
                  increaseProductQuantity(productName);
                  calculateTotal(productName);
                }}
              >
                add to cart
              </Btn>
            </Item>
          );
        })}
      </List>
    </>
  );
};

export default GetProductList;

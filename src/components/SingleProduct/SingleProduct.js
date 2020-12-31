import React, { useContext } from "react";
import StoreContext from "../../contexts/StoreContext/StoreContext";
import styled from "styled-components";
import Img from "../../styledComponents/Img";
import Btn from "../../styledComponents/Btn";

const SingleProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SingleProduct = () => {
  const value = useContext(StoreContext);
  const {
    singleProduct,
    addProductToCart,
    increaseCartCounter,
    increaseProductQuantity,
    calculateTotal,
  } = value;
  return (
    <>
      {singleProduct.map((product) => {
        const {
          productName,
          productPrice,
          productDesc,
          productCategory,
        } = product;
        return (
          <SingleProductDiv>
            <Img
              src={product.productImage.fields.file.url}
              alt="product-image"
            />
            <h2>name: {productName}</h2>
            <h2>price: {productPrice} PLN</h2>
            <h2>description: {productDesc}</h2>
            <h2>category: {productCategory}</h2>
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
          </SingleProductDiv>
        );
      })}
    </>
  );
};

export default SingleProduct;

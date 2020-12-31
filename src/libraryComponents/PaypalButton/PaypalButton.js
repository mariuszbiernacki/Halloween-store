import React, { useContext } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import StoreContext from "../../contexts/StoreContext/StoreContext";
import styled from "styled-components";

const PaypalButton = () => {
  const value = useContext(StoreContext);
  const { total, handleCartClose, clearCart } = value;

  const onSuccessPayment = (payment) => {
    console.log("payment succesful", payment);
    clearCart();
    handleCartClose();
  };

  const onCancelPayment = (payment) => {
    console.log("payment cancelled", payment);
  };

  const onErrorPayment = (error) => {
    console.log("error", error);
  };
  const environment = "sandbox";
  const currency = "PLN";
  const client = {
    sandbox: process.env.REACT_APP_PAYPAL_ID,
    production: "",
  };

  return (
    <>
      <PaypalExpressBtn
        currency={currency}
        env={environment}
        client={client}
        onSuccess={onSuccessPayment}
        onCancel={onCancelPayment}
        onError={onErrorPayment}
        total={total}
      />
    </>
  );
};

export default PaypalButton;

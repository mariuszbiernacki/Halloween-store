import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PaypalButton from "../../libraryComponents/PaypalButton/PaypalButton";
import StoreContext from "../../contexts/StoreContext/StoreContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "theme.spacing(2, 4, 3),",
    width: "500px",
    minHeight: "450px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
  },
  item: {
    display: "flex",
    margin: "1px",
    alignItems: "center",
  },
  product: {
    margin: "5px",
  },
  image: {
    margin: "3px",
    width: "30px",
    height: "40px",
  },
  button: {
    outline: "none",
    borderRadius: "20px",
    margin: "5px",
    padding: "auto",
    backgroundColor: "black",
    color: "white",
    height: "25px",
    width: "25px",
    cursor: "pointer",
    fontSize: "13px",
  },
  bigButton: {
    outline: "none",
    borderRadius: "20px",
    margin: "5px",
    padding: "auto",
    backgroundColor: "black",
    color: "white",
    height: "40px",
    width: "40px",
    cursor: "pointer",
    fontSize: "13px",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const value = useContext(StoreContext);
  const {
    cart,
    handleCartClose,
    openCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
    total,
    calculateTotal,
    calculateTotalBack,
    calculateTotalAfterRemovingProduct,
    clearCart,
    shortCart,
    showMoreProducts,
  } = value;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openCart}
        onClose={handleCartClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openCart}>
          {cart.length > 0 ? (
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Cart / list of your products:</h2>
              <button className={classes.bigButton} onClick={clearCart}>
                clear all
              </button>
              <ul className={classes.list}>
                {shortCart.map((product) => {
                  const {
                    productName,
                    productPrice,
                    productQuantity,
                  } = product;
                  return (
                    <li key={productName} className={classes.item}>
                      <img
                        className={classes.image}
                        src={product.productImage.fields.file.url}
                        alt="cartProductImage"
                      />
                      <h3 className={classes.product}>{productName}</h3>
                      <h3 className={classes.product}>{productPrice} PLN</h3>
                      <button
                        className={classes.button}
                        onClick={() => {
                          calculateTotal(productName);
                          increaseProductQuantity(productName);
                        }}
                      >
                        +
                      </button>
                      <p className={classes.product}>{productQuantity}</p>
                      <button
                        className={classes.button}
                        onClick={() => {
                          calculateTotalBack(productName);
                          decreaseProductQuantity(productName);
                        }}
                      >
                        -
                      </button>
                      <button
                        className={classes.button}
                        onClick={() => {
                          calculateTotalAfterRemovingProduct(productName);
                          removeProductFromCart(productName);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button className={classes.bigButton} onClick={showMoreProducts}>
                show more
              </button>
              <h3>total: {total} PLN</h3>
              <PaypalButton />
            </div>
          ) : (
            <div className={classes.paper}>
              <p>your cart is empty</p>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
};

export default Cart;

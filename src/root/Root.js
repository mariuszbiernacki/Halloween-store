import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { client } from "../contentful/contentful";
import StoreContext from "../contexts/StoreContext/StoreContext";
import StoreTemplate from "../templates/StoreTemplate/StoreTemplate";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Products from "../pages/Products/Products";
import Contact from "../pages/Contact/Contact";
import SingleProduct from "../components/SingleProduct/SingleProduct";

const Root = () => {
  const getCartFromLocalStorage = () => {
    let localStorageCart;
    if (localStorage.getItem("cart")) {
      localStorageCart = JSON.parse(localStorage.getItem("cart"));
    } else {
      localStorageCart = [];
    }
    return localStorageCart;
  };

  const getCartCounterFromLocalStorage = () => {
    let localStorageCartCounter;
    if (localStorage.getItem("cartCounter")) {
      localStorageCartCounter = JSON.parse(localStorage.getItem("cartCounter"));
    } else {
      localStorageCartCounter = [];
    }
    return localStorageCartCounter;
  };

  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState("");

  const [welcomeSlogan, setWelcomeSlogan] = useState("");
  const [indexTimeout, setIndexTimeout] = useState(0);

  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [cartCounter, setCartCounter] = useState(
    getCartCounterFromLocalStorage()
  );
  const [openCart, setOpenCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [shortCart, setShortCart] = useState([]);

  const [filterVisibility, setFilterVisibility] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    client
      .getEntries({
        content_type: "product",
      })
      .then((response) => {
        let cmsList = response.items
          .map((item) => item.fields)
          .sort((a, b) => b.productPrice - a.productPrice);
        setProducts([...cmsList]);
        setFilteredProducts([...cmsList]);
      })
      .catch((error) => console.error(error));
  }, []);

  const seeSingleProduct = (productName) => {
    const chosenProduct = products.filter(
      (product) => product.productName === productName
    );
    setSingleProduct(chosenProduct);
  };

  const setCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const setCartCounterToLocalStorage = () => {
    localStorage.setItem("cartCounter", JSON.stringify(cartCounter));
  };

  useEffect(() => {
    setCartToLocalStorage();
    setCartCounterToLocalStorage();
  }, [cart, cartCounter]);

  const WelcomeSloganInterval = () => {
    let beginSlogan = "";
    let endSlogan = [
      "welcome to our store",
      "thank you for visiting us",
      "trick or treat?",
      "enjoy your halloween",
    ];
    let indexWord = 0;
    let indexLetter = 0;

    let changeWord = () => {
      indexWord++;
      indexLetter = 0;
      indexStart++;
      beginSlogan = "";
      if (indexWord === endSlogan.length - 1) {
        clearInterval(indexChange);
      }
      setInterval(addLetter, 100);
    };

    let indexChange = setInterval(changeWord, 3000);

    const addLetter = () => {
      beginSlogan += endSlogan[indexWord][indexLetter];
      indexLetter++;
      setWelcomeSlogan(beginSlogan);
      if (indexLetter === endSlogan[indexWord].length) {
        clearInterval(indexStart);
      }
    };

    let indexStart = setInterval(addLetter, 100);
  };

  useEffect(() => {
    setIndexTimeout(
      setTimeout(() => {
        WelcomeSloganInterval();
      }, 1)
    );
  }, []);

  const clearHomeInterval = () => {
    clearTimeout(indexTimeout + 1);
    setWelcomeSlogan("welcome to our store");
  };

  useEffect(() => {
    if (cart.length < 8) {
      setShortCart(cart);
    }
  }, [cart]);

  const showMoreProducts = () => {
    setShortCart(cart);
  };

  const handleCartOpen = () => {
    setOpenCart(true);
  };

  const handleCartClose = () => {
    setOpenCart(false);
  };

  const addProductToCart = (productName) => {
    const removeDuplicates = cart.map((product) => {
      return product.productName === productName;
    });
    const chosenProduct = products.filter((product) => {
      return product.productName === productName;
    });
    if (!removeDuplicates.includes(true)) {
      setCart([...cart, ...chosenProduct]);
    }
  };

  const removeProductFromCart = (productName) => {
    const chosenProduct = cart.filter((product) => {
      if (product.productName === productName) {
        setCartCounter(cartCounter - product.productQuantity);
        product.productQuantity = 1;
      } else {
        return product;
      }
    });
    setCart([...chosenProduct]);
  };

  const calculateTotal = (productName) => {
    products.map((product) => {
      if (product.productName === productName) {
        setTotal(total + product.productPrice);
      }
    });
  };

  const calculateTotalBack = (productName) => {
    products.map((product) => {
      if (
        product.productName === productName &&
        total > 0 &&
        product.productQuantity > 0
      ) {
        setTotal(total - product.productPrice);
      }
    });
  };

  const calculateTotalAfterRemovingProduct = (productName) => {
    products.map((product) => {
      if (product.productName === productName) {
        setTotal(total - product.productPrice * product.productQuantity);
      }
    });
  };

  const increaseProductQuantity = (productName) => {
    cart.map((product) => {
      if (product.productName === productName) {
        product.productQuantity += 1;
      }
    });
    setCartCounter(cartCounter + 1);
  };

  const decreaseProductQuantity = (productName) => {
    cart.map((product) => {
      if (product.productName === productName) {
        if (product.productQuantity > 0) {
          product.productQuantity = product.productQuantity - 1;
          setCartCounter(cartCounter - 1);
        }
      }
    });
  };

  const increaseCartCounter = () => {
    setCartCounter(cartCounter + 1);
  };

  const clearCart = () => {
    setCart([]);
    setCartCounter(0);
    setTotal(0);
    setShortCart([]);
  };

  const getMaxPrice = () => {
    const maxNumber = Math.max(
      ...products.map((product) => product.productPrice)
    );
    setMaxPrice(maxNumber);
    setPrice(maxNumber);
  };

  const filterProductsByPrice = (e) => {
    setPrice(e.target.value);
  };

  const filterProductsByName = (e) => {
    setName(e.target.value);
  };

  const filterProductsByDelivery = () => {
    setFreeDelivery(!freeDelivery);
  };

  const filterProductsByCategory = (e) => {
    setCategory(e.target.value);
  };

  const checkDuplicatedCategory = () => {
    const filteredCategories = products.map(
      (product) => product.productCategory
    );
    setCategoryList([...new Set(filteredCategories)]);
  };

  const seeFilters = () => {
    setFilterVisibility(!filterVisibility);
  };

  const sortProducts = () => {
    let tempProducts = [...products];

    if (price < maxPrice) {
      tempProducts = tempProducts.filter(
        (product) => product.productPrice <= price
      );
    }

    tempProducts = tempProducts.filter((product) =>
      product.productName.toUpperCase().includes(name.toUpperCase())
    );

    if (category) {
      if (category === "all") {
        setFilteredProducts([...products]);
      } else {
        tempProducts = tempProducts.filter(
          (product) => product.productCategory == category
        );
      }
    }

    if (freeDelivery === false) {
      setFilteredProducts([...products]);
    } else {
      tempProducts = tempProducts.filter(
        (product) => product.productFreeDelivery === true
      );
    }
    setFilteredProducts([...tempProducts]);
  };

  useEffect(() => {
    checkDuplicatedCategory();
  }, []);

  useEffect(() => {
    checkDuplicatedCategory();
    getMaxPrice();
  }, [products]);

  useEffect(() => {
    sortProducts();
  }, [price, name, freeDelivery, category]);

  return (
    <BrowserRouter>
      <StoreContext.Provider
        value={{
          products,
          seeSingleProduct,
          singleProduct,
          welcomeSlogan,
          WelcomeSloganInterval,
          clearHomeInterval,
          filteredProducts,
          seeFilters,
          filterVisibility,
          categoryList,
          filterProductsByCategory,
          price,
          maxPrice,
          filterProductsByPrice,
          filterProductsByName,
          filterProductsByDelivery,
          freeDelivery,
          cart,
          handleCartOpen,
          handleCartClose,
          openCart,
          cartCounter,
          addProductToCart,
          increaseCartCounter,
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
        }}
      >
        <StoreTemplate>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/Products" component={Products} />
            <Route path="/Contact" component={Contact} />
            <Route path="/SingleProduct" component={SingleProduct} />
          </Switch>
        </StoreTemplate>
      </StoreContext.Provider>
    </BrowserRouter>
  );
};

export default Root;

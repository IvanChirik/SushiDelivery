import React, { useState } from "react";
import Cart from "./components/Cart/Cart.js";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/CartContextProvider.js";

function App() {
  const [viewModal, setViewModal] = useState(false);
  const viewModalHandler = () => {
    setViewModal(!viewModal)
  }

  return (
    <CartContextProvider>
      {viewModal && <Cart viewModal={viewModalHandler} />}
      <Header viewModal={viewModalHandler} />
      <Meals />
    </CartContextProvider>
  );
}

export default App;

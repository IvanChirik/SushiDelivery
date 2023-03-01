import React, { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart.js";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [viewModal, setViewModal] = useState(false);
  const viewModalHandler = () => {
    setViewModal(!viewModal)
  }
  return (
    <Fragment>
      {viewModal && <Cart viewModal={viewModalHandler} />}
      <Header />
      <Meals />
    </Fragment>
  );
}

export default App;

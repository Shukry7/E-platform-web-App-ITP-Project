import React from "react";
import ProductFormUpdate from "./Components/productformUpdate";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const UpdateProduct = () => {
  return (
    <>
      <div>
      <Navbar select={"Product Details"}/>
      <Header/>
        <ProductFormUpdate />
      </div>
    </>
  );
};

export default UpdateProduct;

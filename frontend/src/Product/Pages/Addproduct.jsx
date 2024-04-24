import React from "react";
import ProductForm from "./Components/productform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const AddProduct = () => {
  return (
    <>
      <div>
      <Navbar select={"Product Details"}/>
      <Header/>
        <ProductForm />
      </div>
    </>
  );
};

export default AddProduct;

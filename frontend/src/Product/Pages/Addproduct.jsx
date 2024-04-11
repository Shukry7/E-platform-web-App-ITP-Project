import React from "react";
import ProductForm from "./Components/productform";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const AddProduct = () => {
  return (
    <>
      <div>
        <Navbar />
        <ProductForm />
      </div>
    </>
  );
};

export default AddProduct;

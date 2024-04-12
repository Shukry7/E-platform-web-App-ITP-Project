import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import SupplierForm from "./Components/WholesalecustomerForm";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const CreateWholesalecustomer = () => {
  return (
    <>
      <div>
        <Navbar />
        <SupplierForm />
      </div>
    </>
  );
};

export default CreateWholesalecustomer;
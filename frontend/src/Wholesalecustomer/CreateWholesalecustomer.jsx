import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import SupplierForm from "./Components/SupplierForm";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const CreateSupplier = () => {
  return (
    <>
      <div>
        <Navbar />
        <SupplierForm />
      </div>
    </>
  );
};

export default CreateSupplier;
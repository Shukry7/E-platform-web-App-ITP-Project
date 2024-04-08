import React from "react";
import Card from "../Shared/Components/UiElements/Card";
import CustomerFormUpdate from "./Components/CustomerFormUpdate";
import Navbar from "../Shared/Components/UiElements/Navbar";

const UpdateCustomer = () => {
  return (
    <>
      <div>
        <Navbar />
        <CustomerFormUpdate />
      </div>
    </>
  );
};

export default UpdateCustomer;
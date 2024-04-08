import React from "react";
import Card from "../Shared/Components/UiElements/Card";
import CustomerForm from "./Components/CustomerForm";
import Navbar from "../Shared/Components/UiElements/Navbar";

const RegisterCustomer = () => {
  return (
    <>
      <div>
        <Navbar />
        <CustomerForm />
      </div>
    </>
  );
};

export default RegisterCustomer;
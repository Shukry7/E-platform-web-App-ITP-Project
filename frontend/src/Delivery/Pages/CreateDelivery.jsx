import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import DeliveryForm from "./Components/DeliveryForm";
import Navbar from "../../Shared/Components/UiElements/Navbar";


const CreateDelivery = () => {
  return (
    <>
      <div>
        <Navbar />
        <DeliveryForm />
      </div>
    </>
  );
};

export default CreateDelivery;
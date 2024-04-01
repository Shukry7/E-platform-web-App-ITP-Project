import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import DeliveryFormUpdate from "./Components/DeliveryFormUpdate";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const UpdateDelivery = () => {
  return (
    <>
      <div>
        <Navbar />
        <DeliveryFormUpdate />
      </div>
    </>
  );
};

export default UpdateDelivery;

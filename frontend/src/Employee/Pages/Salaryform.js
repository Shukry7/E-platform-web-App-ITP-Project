import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import SalaryCalculatorForm from "./Components/salary";

const Salaryform = () => {
  return (
    <>
     <Navbar />

      <Card className="flex" style={{ width: "80%" ,height:"20%"}}>
        <SalaryCalculatorForm />
      </Card>
    </>
  );
};

export default Salaryform;

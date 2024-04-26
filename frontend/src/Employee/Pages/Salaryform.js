import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import SalaryCalculatorForm from "./Components/salary";
import Header from "../../Shared/Components/UiElements/header";
const Salaryform = () => {
  return (
    <>
     <Navbar />
     <Header />
     
     <Card className="flex" style={{ width: "80%" }}>

      
        <SalaryCalculatorForm />
      </Card>
    </>
  );
};

export default Salaryform;

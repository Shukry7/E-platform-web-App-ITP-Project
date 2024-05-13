import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import SalaryCalculatorForm from "./Components/salary";

import Header from "../../Shared/Components/UiElements/header";
const Salaryform = () => {
  return (
    <>
     <Navbar />
    
     
     <Card className="flex" style={{ width: "100%" }}>
    
      
        <SalaryCalculatorForm />
        
      </Card>
    </>
  );
};

export default Salaryform;

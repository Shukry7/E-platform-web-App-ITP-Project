import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import ProductformUpdate from "./Components/employeeformUpdate";
import SalaryCalculatorForm from "./Components/salary";

const Salaryform = () => {
  return (
    <>
      <Card className="flex" style={{ width: "80%" }}>
        <SalaryCalculatorForm />
      </Card>
    </>
  );
};

export default Salaryform;

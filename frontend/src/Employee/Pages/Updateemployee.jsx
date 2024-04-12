import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import ProductformUpdate from "./Components/employeeformUpdate";
import EmployeeformUpdate from "./Components/employeeformUpdate";

const Updateemployee = () => {
  return (
    <>
      <Card className="flex" style={{ width: "80%" }}>
        <EmployeeformUpdate />
      </Card>
    </>
  );
};

export default Updateemployee;

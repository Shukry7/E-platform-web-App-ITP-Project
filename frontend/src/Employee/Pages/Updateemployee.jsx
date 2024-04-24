import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import EmployeeFormUpdate from "./Components/employeeformUpdate";

const Updateemployee = () => {
  return (
    <>
      <Card className="flex" style={{ width: "80%" }}>
        <EmployeeFormUpdate />
      </Card>
    </>
  );
};

export default Updateemployee;

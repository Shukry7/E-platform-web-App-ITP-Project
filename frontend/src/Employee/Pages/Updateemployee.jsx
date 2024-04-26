import React from "react";
import Navbar from '../../Shared/Components/UiElements/Navbar';
import Card from "../../Shared/Components/UiElements/Card";
import EmployeeFormUpdate from "./Components/employeeformUpdate";

const Updateemployee = () => {
  return (
    <>
    <Navbar />
      <Card className="flex" style={{ width: "100%" }}>
        <EmployeeFormUpdate />
      </Card>
    </>
  );
};

export default Updateemployee;

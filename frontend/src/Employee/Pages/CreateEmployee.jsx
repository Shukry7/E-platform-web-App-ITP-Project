import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import EmployeeForm from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const CreateEmployee = () => {
  return (
    <>
       <div>
        <Navbar />
        <EmployeeForm />
      </div>
    </>
  );
};

export default CreateEmployee;
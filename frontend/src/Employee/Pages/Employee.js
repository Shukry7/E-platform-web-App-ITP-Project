import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./Components/EmployeeTable";
import Card from "../../Shared/Components/UiElements/Card"
import { Type } from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const Employee = () => {

  const [employee , setemployee] = useState([]);
  const [loading , setLoading] = useState(false)
  
  useEffect(() =>{
    setLoading(true)
    axios
    .get("http://localhost:5000/employee")
    .then(res => {
      setemployee(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setLoading(false)});

  },[])
  return (
    <>
    <Navbar/>
    <Card style={{width: "50%"}}>
      <EmployeeTable Employee={employee} loading={loading} setloading={setLoading}/>
      </Card>
    </>
  );
};

export default Employee;

import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./Components/EmployeeTable";
import Card from "../../Shared/Components/UiElements/Card"
import { Type } from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

const Employee = () => {

  const [employee, setemployee] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/employee")
      .then(res => {
        setemployee(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });

  }, [])
  return (
    <><div>
      <Navbar />

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Employee List</h1>
          <Link to="/employee/new">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        <EmployeeTable Employee={employee} loading={loading} setloading={setLoading} />
      </Card>

    </div>

    </>
  );
};

export default Employee;

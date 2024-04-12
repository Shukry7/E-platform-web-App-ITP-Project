import React, { useState, useEffect } from "react";
import "./employeeTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import {SnackbarProvider, useSnackbar} from 'notistack';
import { Link } from "react-router-dom";
import { MdDeleteForever,MdUpdate } from "react-icons/md";




const EmployeeTable = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  
  useEffect(() => {
    setFilteredEmployees(props.Employee);
  }, [props.Employee]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = props.Employee.filter(employee =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase())||
    employee.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };


  const deleteHandle = (id) => {
    props.setloading(true);
    axios
      .delete(`http://localhost:5000/employee/${id}`)
      .then((res) => {
        props.setloading(false);
        enqueueSnackbar('Employee deleted successfully',{variant:'success'});
        Navigate("/Employee");
      })
      .catch((err) => {
        console.error(err);
        props.setloading(false);
      });
  };

  const Headings = [
    "#",
    "Employee ID",
    "Employee name",
    "Address",
    "Telephone",
    "Email",
    "Type",
    "Daily Wage",
    "Action",
  ];

  

   


  return (
    <>
    <input
        type="text"
        placeholder="🔍 Search Employee "
        value={searchTerm}
        onChange={handleSearch}
        className="block w-full border-gray-300 mb-2 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      
      <Table Headings={Headings} style={{width:"100%"}}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            filteredEmployees.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.ID}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td class="px-6 py-4">{item.address}</td>
                  <td class="px-6 py-4">{item.telephone}</td>
                  <td class="px-6 py-4">{item.mail}</td>
                  <td class="px-6 py-4">{item.type}</td>
                  <td class="px-6 py-4">Rs.{item.hourlywage}/-</td>
                 
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    
                    link2={`/Employee/update/`+ item._id}
                    deletelink={`http://localhost:5000/employee/${item._id}`}
                    />
                  </td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default EmployeeTable;


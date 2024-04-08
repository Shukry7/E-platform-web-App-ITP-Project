import React from "react";
import "./employeeTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";

import { Link } from "react-router-dom";
import { MdDeleteForever,MdUpdate } from "react-icons/md";

const EmployeeTable = (props) => {
  const deleteHandle = (id) => {
    props.setloading(true);
    axios
      .delete(`http://localhost:5000/employee/${id}`)
      .then((res) => {
        props.setloading(false);
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
    "Hourly Wage",
    "Action",
  ];

  return (
    <>
      <Table Headings={Headings}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.Employee.map((item, index) => {
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
                  <td class="px-6 py-4">{item.hourlywage}</td>
                 
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


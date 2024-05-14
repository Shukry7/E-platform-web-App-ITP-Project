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




const HistoryTable = (props) => {
 
  const Headings = [
    "#",
    "Employee ID",
    "Employee name",
    "Date",
    "status",
    "Net Amount",
    
  ];

  

   


  return (
    <>
      
      <Table Headings={Headings} style={{width:"100%"}} >
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.Employee.map((item, index) => {
              return (
                <TableRow>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.employee.ID}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.employee.name}
                  </th>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.amount}</td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default HistoryTable;


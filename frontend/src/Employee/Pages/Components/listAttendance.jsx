import React, { useState, useEffect } from "react";
import "./employeeTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdUpdate } from "react-icons/md";

const AttendanceTable = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [employee, setemployee] = useState([]);

  var now = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayName = days[now.getDay()];
  var day = now.getDate();
  var months = now.getMonth() +1;
  var month = now.toLocaleString("default", { month: "long" });
  var year = now.getFullYear();
  var dateTimeString = dayName + ", " + day + " " + month + " " + year;

  const date = new Date(dateTimeString);
  var day2 = date.getDate();
  var months2 = date.getMonth() +1;
  
  const formattedDate = `${day2}/${months2}`;

  const Headings = [
    "#",
    "Employee ID",
    "Employee name"
  ];
  for(let i = 3 ; i<=13 ; i++){
    Headings[i] = `${day2 - (i-3)}/${months2}`
  }


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/employee")
      .then((res) => {
        setemployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Table Headings={Headings} style={{ width: "100%" }}>
        {props.loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          <>
            {employee.map((item, index) => {

              const employeeAttendance = props.Attendance.filter(attendance => attendance.employee.ID === item.ID);
              console.log(employeeAttendance)
              return (
                <>
                  <TableRow>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.ID}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    {employeeAttendance.map((attendence) => {
                      return(
                      <td key={index} className="px-6 py-4">{attendence.status}</td>)
                    })}
                  </TableRow>
                </>

              );
            })}
          </>
        )}
      </Table>
    </>
  );
};

export default AttendanceTable;

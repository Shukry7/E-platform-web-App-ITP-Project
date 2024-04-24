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
  var month = now.toLocaleString("default", { month: "long" });
  var year = now.getFullYear();
  var dateTimeString = dayName + ", " + day + " " + month + " " + year;

  const date = new Date(dateTimeString);
  var day2 = date.getDate();
  var months2 = date.getMonth() + 1;

  const Headings = ["#", "Employee ID", "Employee name", "Days Worked"];
  for (let i = 4; i <= 24; i++) {
    Headings[i] = `${day2 - (i - 4)}/${months2}`;
  }


  const getPresentDaysCount = (employeeAttendance) => {
    return employeeAttendance.filter(
      (attendance) => attendance.status === "Present"
    ).length;
  };

  return (
    <>
      <Table Headings={Headings} style={{ width: "100%" }}>
        {props.loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          <>
            {props.employee.map((item, index) => {
              const employeeAttendance = props.Attendance.filter(
                (attendance) => {
                  if (attendance && attendance.employee) {
                    return attendance.employee._id === item._id;
                  }
                  return false;
                }
              );
              console.log(employeeAttendance)
              const presentDaysCount = getPresentDaysCount(employeeAttendance);

              const attendanceMap = {};
              employeeAttendance.forEach((attendence) => {
                const attendanceDate = new Date(attendence.date);
                const day = attendanceDate.getDate();
                const month = attendanceDate.getMonth() + 1;
                const formattedDate = `${day}/${month}`;
                attendanceMap[formattedDate] = attendence.status;
              });

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
                    <td className="px-6 py-4">{presentDaysCount}</td>
                    {Headings.slice(4).map((headingDate, dateIndex) => {
                                const status = attendanceMap[headingDate] || "No Data!";
                                return (
                                    <td
                                        key={dateIndex}
                                        className={`px-6 py-4 ${ status === "Present" && "text-green-500"}  
                                        ${ status === "Absent" && "text-red-500"}  
                                        ${ status === "Pending" && "text-yellow-900"}  
                                        }`}
                                    >
                                        {status}
                                    </td>
                                );
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

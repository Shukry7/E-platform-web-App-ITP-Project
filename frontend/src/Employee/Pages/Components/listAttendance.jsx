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
  var months = now.getMonth();
  var month = now.toLocaleString("default", { month: "long" });
  var year = now.getFullYear();
  var dateTimeString = dayName + ", " + day + " " + month + " " + year;

  const Headings = [
    "#",
    "Employee ID",
    "Employee name",
    day + "/" + months,
    day - 1 + "/" + months,
    day - 2 + "/" + months,
    day - 3 + "/" + months,
    day - 4 + "/" + months,
    day - 5 + "/" + months,
  ];

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

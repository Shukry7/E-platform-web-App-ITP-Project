import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkbox from "./Dropdown";
import Dropdown from "../Components/Dropdown";

const MarkAttendance = () => {
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

  const [date, setDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/employee")
      .then((res) => {
        setEmployees(res.data);
        const initialAttendanceRecords = res.data.map((employee) => ({
          employee: employee,
          date: dateTimeString,
          status: "Absent",
        }));
        setAttendanceRecords(initialAttendanceRecords);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post("http://localhost:5000/attendance/mark", {
        employee: attendanceRecords,
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    console.log("Attendance Records:", attendanceRecords);
  };

  const handleStatusChange = (employee, date, status) => {
    const existingRecordIndex = attendanceRecords.findIndex(
      (record) => record.employee === employee && record.date === date
    );

    if (existingRecordIndex !== -1) {
      // If record already exists, update its status
      setAttendanceRecords((prevRecords) =>
        prevRecords.map((record, index) =>
          index === existingRecordIndex ? { ...record, status } : record
        )
      );
    } else {
      // If record doesn't exist, add it to the array
      setAttendanceRecords((prevRecords) => [
        ...prevRecords,
        { employee, date, status },
      ]);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Mark Employee Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <span>{dateTimeString}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employee ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.ID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Dropdown
                        employee={employee}
                        date={dateTimeString}
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Submitting..." : "Submit Attendance"}
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;

import React, { useState } from "react";
import axios from "axios";
import Button from "../../../Shared/Components/FormElements/Button";
import Loader from "../../../Shared/Components/UiElements/Loader";

const EmployeeAttendanceForm = () => {
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [date, setDate] = useState("");

  const handleStatusChange = (index, status) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[index].status = status;
    setAttendanceData(updatedAttendance);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/attendance/mark", {
        date,
        attendance: attendanceData,
      });
      alert("Attendance marked successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
    }
    setLoading(false);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee");
      setAttendanceData(
        response.data.map((employee) => ({
          empID: employee._id,
          empName: employee.name,
          status: "",
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Mark Employee Attendance</h2>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-200 shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((employee, index) => (
                  <tr key={employee.empID}>
                    <td className="px-6 py-4 whitespace-nowrap">{employee.empID}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{employee.empName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={employee.status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Submit
          </Button>
        </div>
      )}
    </form>
  );
};

export default EmployeeAttendanceForm;

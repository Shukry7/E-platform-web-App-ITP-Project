import React, { useState, useEffect } from "react";
import axios from "axios";

const MarkAttendance = () => {
  const [date, setDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employee");
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleMarkAttendance = async (employeeID, status) => {
    try {
      await axios.post("http://localhost:5000/attendance/mark", {
        empID: employeeID,
        empName: employees.find((emp) => emp._id === employeeID).name,
        date: date,
        status: status,
      });
      alert("Attendance marked successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(attendanceRecords.map(async (record) => {
        await axios.post("http://localhost:5000/attendance/mark", record);
      }));
      alert("Attendance marked successfully");
      setAttendanceRecords([]);
    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
    }
  };

  const handleStatusChange = (employeeID, status) => {
    const updatedAttendance = attendanceRecords.filter(record => record.empID !== employeeID);
    updatedAttendance.push({
      empID: employeeID,
      empName: employees.find(emp => emp._id === employeeID).name,
      date: date,
      status: status
    });
    setAttendanceRecords(updatedAttendance);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Mark Employee Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          className="mb-4 p-2 rounded border border-gray-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Employee ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="px-4 py-2">{employee.ID}</td>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">
                  <button
                    className={`mr-2 px-4 py-2 rounded ${attendanceRecords.find(record => record.empID === employee._id && record.status === 'present') ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                    onClick={() => handleStatusChange(employee._id, 'present')}
                  >
                    Present
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${attendanceRecords.find(record => record.empID === employee._id && record.status === 'absent') ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                    onClick={() => handleStatusChange(employee._id, 'absent')}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;
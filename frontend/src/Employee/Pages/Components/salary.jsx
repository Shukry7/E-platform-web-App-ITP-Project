import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalaryCalculatorForm = () => {
  const [empid, setEmpid] = useState('');
  const [empname, setEmpname] = useState('');
  const [dailywage, setDailyWage] = useState(0);
  const [noOfDays, setNoOfDays] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [salary, setSalary] = useState(0);
  const [employeeIds, setEmployeeIds] = useState([]);

  useEffect(() => {
    // Fetch employee IDs when the component mounts
    axios.get(`http://localhost:5000/employee/ids`)
      .then(response => {
        setEmployeeIds(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee IDs:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch employee data when empid changes
    if (empid) {
      axios.get(`http://localhost:5000/employee/${empid}`)
        .then(response => {
          const { empname, dailywage } = response.data;
          setEmpname(empname);
          setDailyWage(dailywage);
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
        });
    }
  }, [empid]);

  const handleCalculateSalary = () => {
    // Calculate salary here
    const totalSalary = (dailywage * noOfDays) + bonus;
    setSalary(totalSalary);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Salary Calculator</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="empid" className="block mb-1">Employee ID:</label>
          <select
            id="empid"
            value={empid}
            onChange={e => setEmpid(e.target.value)}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Employee ID</option>
            {employeeIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="empname" className="block mb-1">Employee Name:</label>
          <input
            id="empname"
            type="text"
            value={empname}
            readOnly
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dailywage" className="block mb-1">Daily Wage:</label>
          <input
            id="dailywage"
            type="number"
            value={dailywage}
            readOnly
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="noOfDays" className="block mb-1">No. of Days Worked:</label>
          <input
            id="noOfDays"
            type="number"
            value={noOfDays}
            onChange={e => setNoOfDays(e.target.value)}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bonus" className="block mb-1">Bonus:</label>
          <input
            id="bonus"
            type="number"
            value={bonus}
            onChange={e => setBonus(e.target.value)}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="button"
          onClick={handleCalculateSalary}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Calculate Salary
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Total Salary: {salary}</h3>
      </div>
    </div>
  );
};

export default SalaryCalculatorForm;

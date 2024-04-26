import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";


const SalaryCalculatorForm = () => {

  var now = new Date();
  var day = now.getDate() ;
  var month = now.toLocaleString("default", { month: "long" });
  var year = now.getFullYear();

  const navigate = useNavigate();
  const [empid, setEmpid] = useState('');
  const [empname, setEmpname] = useState('');
  const [dailywage, setDailyWage] = useState(0);
  const [noOfDays, setNoOfDays] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [salary, setSalary] = useState(0);
  const [Employee, setEmployee] = useState([]);
  const [Total, setTotal] = useState(0);
  const [attendance, setattendance] = useState([]);
  const [Loading , setLoading] = useState(false)
  const [formState, inputHandler] = useForm(
    {
      employee: {
        value: "",
        isValid: false,
      },
      
      date: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
      net:{
        value:"",
        isValid:false,

      },
      
    },
    false
  );
  
  const submitHandler = async (event) => {
    event.preventDefault();
    const statuss="pending";
    setLoading(true);
    axios
      .post("http://localhost:5000/salary/new", {
        id: 1,
        employee: empid,
        date: day,
        status: statuss,
        net:Total,
        
        
      })
      .then((res) => {
        setLoading(false);
        Toast("Employee salary Added calculated!! 🔥","success")
        navigate("/salary");
      })
      .catch((err) => {
        
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  

  useEffect(() => {
    // Fetch employee IDs when the component mounts
    axios.get(`http://localhost:5000/employee`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee IDs:', error);
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/attendance/attendancelist")
      .then(res => {
        setattendance(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });
  }, [])

  useEffect(() => {
    // Fetch employee data when empid changes
    if (empid) {
      axios.get(`http://localhost:5000/employee/salaryform/${empid}`)
        .then(response => {
          console.log(response.data)
          const { name, hourlywage } = response.data;
          setEmpname(name);
          setDailyWage(hourlywage);
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
        });
        let employeeAttendance = attendance.filter((attendance) => {
          if (attendance && attendance.employee) {
            return attendance.employee._id === empid;
          }
          return false;
        })
        setNoOfDays(() => {
          return employeeAttendance.filter(
            (attendance) => attendance.status === "Present"
          ).length;
        })


    }
  }, [empid , setEmpid]);

  const changedetails =(e) => {
      setEmpid(e.target.value)
  }
  const handleCalculateSalary = () => {
    // Calculate salary here
    const sal = (dailywage * noOfDays);
    const totalSalary = (sal + parseInt(bonus));
    setSalary(totalSalary);
    setTotal(totalSalary)
  };
  const handleButtonClick = () => {
    submitHandler(); // Call submitHandler
    handleCalculateSalary(); // Call handleCalculateSalary
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-gray-100 rounded-md shadow-md">
    
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-bold">Salary Calculator</h2>
    <h3 className="text-lg ">Month: {month}</h3>
  </div>
      <form onSubmit={submitHandler} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="empid" className="mb-1">Employee ID:</label>
          <select
            id="empid"
            value={empid}
            onChange={e => setEmpid(e.target.value)}
            
            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option>Select Employee ID</option>
            {Employee.map(id => (
              <option key={id._id} value={id._id}>{id.ID}  {id.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="empname" className="mb-1">Employee Name:</label>
          <input
            id="empname"
            type="text"
            value={empname}
            onInput={inputHandler}
            
            readOnly
            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dailywage" className="mb-1">Daily Wage:</label>
          <input
            id="dailywage"
            type="number"
            value={dailywage}
            readOnly
            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="noOfDays" className="mb-1">No. of Days Worked:</label>
          <input
            id="noOfDays"
            type="number"
            value={noOfDays}
            readOnly
            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="bonus" className="mb-1">Bonus:</label>
          <input
            id="bonus"
            type="number"
            value={bonus}
            onChange={e => setBonus(e.target.value)}
            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Calculate Salary
        </button>
        <div>
          <label htmlFor="bonus" className="mt-4 mb-1">Net salary </label>
          <input
            id="salary"
            type="number"
            onInput={inputHandler}
            value={Total}
            onChange={e => setBonus(e.target.value)}
            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

      </form>
    </div>
  );
};

export default SalaryCalculatorForm;

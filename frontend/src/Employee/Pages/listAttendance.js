import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./Components/EmployeeTable";
import Card from "../../Shared/Components/UiElements/Card"
import { Type } from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import AttendanceTable from "./Components/listAttendance";


const Attendance = () => {
  
  const [deleteAttendance, setDeleteAttendance] = useState(1);
  const [attendance, setattendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  
  useEffect(() => {
    setFilteredAttendance(attendance);
  }, [attendance]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = attendance.filter(attendance =>
      attendance.name.toLowerCase().includes(e.target.value.toLowerCase())||
    attendance.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(filtered);
  };

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/attendance/attendancelist")
      .then(res => {
        setattendance(res.data)
        console.log(attendance)
        console.log(filteredAttendance)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });
  }, [deleteAttendance])
  return (
    <><div>
      <Navbar />

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Employee List</h1>
          <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
          <Link to="/employee/new">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        <AttendanceTable
        
        Attendance={filteredAttendance} 
        loading={loading} 
        setloading={setLoading}
        
        />
      </Card>

    </div>

    </>
  );
};

export default Attendance;

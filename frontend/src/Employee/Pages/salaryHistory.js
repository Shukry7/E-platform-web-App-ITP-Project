import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryTable from "./Components/salaryHistory";
import Card from "../../Shared/Components/UiElements/Card"
import { Type } from "./Components/employeeform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";



const History = () => {
 
  const [displayHistory, setDisplayHistory] = useState([]);

  const [history, sethistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setFilteredHistory(history);
  }, [history]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = history.filter(history =>
        history.employee.name.toLowerCase().includes(e.target.value.toLowerCase())||
        history.employee.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredHistory(filtered);
    setActivePage(1);
  };

  useEffect(() => {
    setFilteredHistory(history);
    setDisplayHistory(history)
  }, [history]);
  
  const handlePageChange = (page) => {
    setActivePage(page);
  };
  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayHistory(filteredHistory.slice(startIndex, endIndex));
  }, [activePage, filteredHistory]);

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/salaryHistory")
      .then(res => {
        sethistory(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });
  }, [])
  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <Header/>

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Employee List</h1>
          <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
        </div>
        <HistoryTable
        
        Employee={displayHistory} 
        loading={loading} 
        setloading={setLoading}
        />
         <Pagination
            active={activePage}
            totalItems={filteredHistory.length}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
      </Card>

    </div>

    </>
  );
};

export default History;

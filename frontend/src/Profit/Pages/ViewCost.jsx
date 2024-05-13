import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import CostTable from "./Components/CostTable";
import Header from "../../Shared/Components/UiElements/header";

const ViewCost = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredCost, setFilteredCost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/profit/cost/`)
      .then((res) => {
        setCost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCost(cost);
  }, [cost]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = cost.filter(
      (cost) =>
        cost.product.toLowerCase().includes(e.target.value.toLowerCase()) ||
        cost.date.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCost(filtered);
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />

        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Cost History</h1>
            <div className="mr-96">
              <Search
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                placeholder={"Search By Product / Date"}
              />
            </div>
          </div>
          <CostTable
            Cost={FilteredCost}
            loading={loading}
            setloading={setLoading}
          />
        </Card>
      </div>
    </>
  );
};

export default ViewCost;

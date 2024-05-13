import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import ProfitTable from "./Components/ProfitTable";
import Header from "../../Shared/Components/UiElements/header";

const ViewProfit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredProfit, setFilteredProfit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profit, setprofit] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/profit/profit/`)
      .then((res) => {
        setprofit(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setFilteredProfit(profit);
  }, [profit]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = profit.filter(
      (profit) =>
        profit.order.toLowerCase().includes(e.target.value.toLowerCase()) ||
        profit.product.toLowerCase().includes(e.target.value.toLowerCase()) ||
        profit.date.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProfit(filtered);
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />

        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Purchase History</h1>
            <div className="mr-96">
              <Search
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                placeholder={"Search By ProductID / OrderID / Date"}
              />
            </div>
          </div>
          <ProfitTable
            Profit={FilteredProfit}
            loading={loading}
            setloading={setLoading}
          />
        </Card>
      </div>
    </>
  );
};

export default ViewProfit;

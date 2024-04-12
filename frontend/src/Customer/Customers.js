import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerTable from "./Components/CustomerTable";
import Card from "../Shared/Components/UiElements/Card";
import Navbar from "../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

const Customers = () => {
  const [customers, setcustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/customer")
      .then((res) => {
        setcustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        <Navbar />
        
            <Card className="flex" style={{ width: "100%" }}>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Customer List</h1>
                <Link to="/Customer/create">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <CustomerTable
                Customers={customers}
                loading={loading}
                setloading={setLoading}
              />
            </Card>
          
      </div>
    </>
  );
};

export default Customers;

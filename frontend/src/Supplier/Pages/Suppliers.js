import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierTable from "./Components/SupplierTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";

const Suppliers = () => {
  const [suppliers, setsupplier] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProduct, setdeleteProduct] = useState(false);
  const [FilteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/supplier")
      .then((res) => {
        setsupplier(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [deleteProduct]);

  useEffect(() => {
    setFilteredSuppliers(suppliers);
  }, [suppliers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(e.target.value.toLowerCase())||
      supplier.ID.toLowerCase().includes(e.target.value.toLowerCase())||
      supplier.address.toLowerCase().includes(e.target.value.toLowerCase())||
      supplier.city.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  return (
    <>
      <div>
        <Navbar />
        
            <Card className="flex" style={{ width: "100%" }}>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Supplier List</h1>
                <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name / Address"}
                />
                <Link to="/Supplier/create">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <SupplierTable
                Suppliers={FilteredSuppliers}
                loading={loading}
                setloading={setLoading}
                dlt= {setdeleteProduct}
              />
            </Card>
          
      </div>
    </>
  );
};

export default Suppliers;

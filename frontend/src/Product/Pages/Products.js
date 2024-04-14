import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "./Components/ProductTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProduct,setDeleteProduct] = useState(false)
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [deleteProduct]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())||
      product.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  


  return (
    <>
      <div>
        <Navbar />
        
            <Card className="flex" style={{ width: "100%" }}>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl my-8">Product List</h1>
                <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
                <Link to="/Product/new">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <ProductTable
                Product={FilteredProducts}
                loading={loading}
                setLoading={setLoading}
                dlt={setDeleteProduct}
              />
              <Pagination/>
            </Card>
          
      </div>
    </>
  );
};

export default Products;

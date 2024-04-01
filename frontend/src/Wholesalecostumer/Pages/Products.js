import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "./Components/ProductTable";
import Card from "../../Shared/Components/UiElements/Card";
import { Category } from "./Components/productform";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setproducts(res.data);
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
                <h1 className="text-3xl my-8">Product List</h1>
                <Link to="/Product/new">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <ProductTable
                Product={products}
                loading={loading}
                setloading={setLoading}
              />
            </Card>
          
      </div>
    </>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "./Components/ProductTable";
import Card from "../../../Shared/Components/UiElements/Card"
import { Category } from "./Components/productform";
import Navbar from "../../../Shared/Components/UiElements/Navbar";

const Products = () => {

  const [products , setproducts] = useState([]);
  const [loading , setLoading] = useState(false)
  
  useEffect(() =>{
    setLoading(true)
    axios
    .get("http://localhost:5000/product")
    .then(res => {
      setproducts(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setLoading(false)});

  },[])
  return (
    <>
    <Navbar/>
    <Card style={{width: "50%"}}>
      <ProductTable Product={products} loading={loading} setloading={setLoading}/>
      </Card>
    </>
  );
};

export default Products;

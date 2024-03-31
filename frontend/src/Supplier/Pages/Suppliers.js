import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierTable from "./Components/SupplierTable";
import Card from "../../Shared/Components/UiElements/Card"
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import {MdOutlineAddBox} from 'react-icons/md'

const Suppliers = () => {

  const [suppliers , setsupplier] = useState([]);
  const [loading , setLoading] = useState(false)
  
  useEffect(() =>{
    setLoading(true)
    axios
    .get("http://localhost:5000/supplier")
    .then(res => {
      setsupplier(res.data)
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
    <div className='flex justify-between items-center'>
      <h1 className='text-3xl my-8'>Supplier List</h1>
      <Link to='/Supplier/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
      </Link>
    </div>
      <SupplierTable Suppliers={suppliers} loading={loading} setloading={setLoading}/>
      </Card>
    </>
  );
};

export default Suppliers;

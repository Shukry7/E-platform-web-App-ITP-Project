import React, { useEffect, useState } from "react";
import axios from "axios";
import DeliveryTable from "./Components/DeliveryTable";
import Card from "../../Shared/Components/UiElements/Card"
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import {MdOutlineAddBox} from 'react-icons/md'

const Delivery = () => {

  const [delivery, setdelivery] = useState([]);
  const [loading , setLoading] = useState(false)
  
  useEffect(() =>{
    setLoading(true)
    axios
    .get("http://localhost:5000/delivery")
    .then(res => {
       setdelivery(res.data)
       setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setLoading(false)});
  },[]);
  return (
    <>
    <div>
    <Navbar/>
   
    <Card style={{width: "100%"}}>
    <div className="flex justify-between items-center">
      <h1 className="text-3xl my-8">Delivery Person Lists</h1>
      <Link to='/Delivery/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
      </Link>
    </div>
      <DeliveryTable 
        Delivery={delivery}
        loading={loading} 
        setloading={setLoading}

        />
      </Card>
      
    </div>
    </>
  );
  };       

export default Delivery;

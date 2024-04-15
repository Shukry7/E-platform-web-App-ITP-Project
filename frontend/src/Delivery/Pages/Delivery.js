import React, { useEffect, useState } from "react";
import axios from "axios";
import DeliveryTable from "./Components/DeliveryTable";
import Card from "../../Shared/Components/UiElements/Card"
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import {MdOutlineAddBox} from 'react-icons/md'
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";

const Delivery = () => {

  const [delivery, setdelivery] = useState([]);
  const [displayDelivery, setDisplayDelivery] = useState([]);
  const [loading , setLoading] = useState(false)
  const [deleteDelivery, setdeleteDelivery] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredDeliveryPersons , setFilteredDeliveryPersons] = useState([]);
  const [activePage, setActivePage] = useState(1);
  
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
  },[deleteDelivery]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    setFilteredDeliveryPersons(delivery);
    setDisplayDelivery(delivery)
  }, [delivery]);


  
  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayDelivery(FilteredDeliveryPersons.slice(startIndex, endIndex));
  }, [ activePage, FilteredDeliveryPersons]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = delivery.filter(delivery =>
      delivery.name.toLowerCase().includes(e.target.value.toLowerCase())||
      delivery.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDeliveryPersons(filtered);
    setActivePage(1)
  };

  return (
    <>
    <div>
    <Navbar/>
   
    <Card style={{width: "100%"}}>
    <div className="flex items-center justify-between">
      <h1 className="text-3xl my-8">Delivery Person Lists</h1>
      <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
      <Link to='/Delivery/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
      </Link>
    </div>
      <DeliveryTable 
        Delivery={displayDelivery}
        loading={loading} 
        setloading={setLoading}
        dlt= {setdeleteDelivery}
        active={activePage}
        itemsPerPage={6}
        />
        <Pagination
            active={activePage}
            totalItems={FilteredDeliveryPersons.length}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
      </Card>
      
    </div>
    </>
  );
  };       

export default Delivery;

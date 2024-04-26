import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Shared/Components/UiElements/Navbar';
import ViewCard from './Components/ViewCard';
import Header from '../Shared/Components/UiElements/header';

const ViewCustomer = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const[loading1, setLoading1] = useState(false);
    const [customer, setcustomer] = useState({});

    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/customer/${id}`)
            .then((res)=> {
                setcustomer(res.data);
                setLoading1(false);
            })
            .catch((err)=> {
                console.log(err);
                setLoading1(false);
            });
    }, [id] );


    console.log(customer)

    return (
      <>
        <div className='flex'>
          <div>
            <Navbar />
            <Header/>
          </div>
          <div className='flex-1 w-64 ...'>
          <ViewCard
            customer = {customer}
            loading1 = {loading1}
            setloading1 = {setLoading1}
          />
        </div>  
        </div>
      </>
    );
}

export default ViewCustomer;
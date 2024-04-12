import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Shared/Components/UiElements/Navbar';
import ViewCard from './Components/ViewCard';

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
          </div>
          <div className=" bg-gray-100 p-4 flex-initial w-96 ...">
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
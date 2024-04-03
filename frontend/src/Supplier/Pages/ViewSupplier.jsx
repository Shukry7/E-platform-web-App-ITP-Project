import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../Shared/Components/UiElements/Loader';
import Navbar from '../../Shared/Components/UiElements/Navbar';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Card from '../../Shared/Components/UiElements/Card';
import SupplierProductTable from './Components/SupplierProductTable';
import ViewCard from '../../Shared/Components/UiElements/ViewCard';

const ViewSupplier = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const [supplier, setsupplier] = useState({});
    const [supplierProduct, setsupplierProduct] = useState([]);

    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/supplier/${id}`)
            .then((res)=> {
                setsupplier(res.data);
                setLoading(false);
            })
            .catch((err)=> {
                console.log(err);
                setLoading(false);
            });
    }, [id] );

    useEffect(() => {
      setLoading(true);
      axios
        .get(`http://localhost:5000/supplierproduct/${id}`)
        .then((res) => {
          setsupplierProduct(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, [id]);

    console.log(supplierProduct)

    return (
      <>
        <div className='flex'>
          <div>
            <Navbar />
          </div>
          <div className='flex-1 w-64 ...'>
            <Card className="" style={{ width: "90%"}}>
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl my-8">Products</h1>
                  <Link to="">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                  </Link>
                </div>
                <SupplierProductTable
                  supplierProducts={supplierProduct}
                  loading={loading}
                  setloading={setLoading}
                />
            </Card>
          </div>
          <div className=" bg-gray-100 p-4 flex-initial w-96 ...">
          <ViewCard/>
        </div>  
        </div>
      </>
    );
}

export default ViewSupplier;
import React, { useEffect, useState } from "react";
import axios from "axios";
import WholesalecustomerTable from "./Components/WholesalecustomerTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

const Wholesalecustomer = () => {
  const [wholesalecustomer, setwholesalecustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/wholesalecustomer")
      .then((res) => {
        setwholesalecustomer(res.data);
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
                <h1 className="text-3xl my-8">Wholesalecustomer List</h1>
                <Link to="/Wholesalecustomer/create">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <WholesalecustomerTable
                Wholesalecustomer={wholesalecustomer}
                loading={loading}
                setloading={setLoading}
              />
            </Card>
          
      </div>
    </>
  );
};

export default Wholesalecustomer;

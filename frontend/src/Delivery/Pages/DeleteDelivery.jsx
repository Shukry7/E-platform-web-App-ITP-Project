import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Shared/Components/UiElements/Loader";

const DeleteDelivery = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteDelivery = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/delivery/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/Delivery");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened, Please check console!");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Delete Delivery</h1>
      {loading ? <Loader /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure?</h3>
        <button className="p-4 bg-red-600 w-full" onClick={handleDeleteDelivery}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteDelivery;
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../../Shared/Components/context/authcontext';

const ProductList = () => {

  const auth = useContext(AuthContext)
  console.log(auth.cusId)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10 md:px-20">
        {products.map((item) => {
          return (
            <div class="bg-white rounded-xl shadow-md overflow-hidden ease-in-out delay-150 hover:-translate-y-1 hover:cursor-pointer hover:scale-105 duration-300 ...">
              <div class="relative">
                <img
                  class="w-full h-48 object-cover"
                  src={`http://localhost:5000/${item.image}`}
                />
              </div>
              <div class="p-4">
                <h1 class="flex-auto text-xl font-semibold dark:text">
                {item.name}
                </h1>
                <div class="text-xl font-semibold text-gray-500 dark:text">
                  Rs.{item.price}.00
                </div>
                {item.Stock === 0 ? 
                  <div class="flex-none w-full mt-2 text-sm font-medium text-red-700 ">
                  Out Of Stock
                </div> : <div class="flex-none w-full mt-2 text-sm font-medium text-green-500 ">
                  In stock
                </div>}
                <p class="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/product/update/661b79671c2d1ecff2e8e221`)
      .then((res) => {
        setProduct(res.data)
        setLoading(false);
        
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
      
  }, []);
  let Status = 1
  if(product.Stock === 0){
    Status = 0
  }
  return (
    <>
      <div class="dark:bg-gray-100 bg-gray-800 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div class="h-[460px] rounded-lg dark:bg-gray-300 bg-gray-700 mb-4">
                <img
                  class="w-full h-full object-cover"
                  src={`http://localhost:5000/${product.image}`}
                  alt="Product Image"
                />
              </div>
              
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="text-2xl font-bold dark:text-gray-800 text-white mb-2">
                Product Name
              </h2>
              <p class="dark:text-gray-600 text-gray-300 text-sm mb-4">
              {product.name}
              </p>
              <div class="flex mb-4">
                <div class="mr-4">
                  <span class="font-bold dark:text-gray-700 text-gray-300">
                    Price:
                  </span>
                  <span class="dark:text-gray-600 text-gray-300 ml-2" >
                    Rs. {product.price}.00
                  </span>
                </div>
                <div>
                  <span class="font-bold dark:text-gray-700 text-gray-300">
                    Availability:
                  </span>
                  <span class="dark:text-gray-600 text-gray-300 ml-2">{Status === 1 ? <> {product.Stock} in Stock</> : <>Out Of Stock</>}</span>
                </div>
              </div>
              <div class="mb-4">
                <span class="font-bold dark:text-gray-700 text-gray-300">
                  Product Description:
                </span>
                <p class="dark:text-gray-600 text-gray-300 text-sm mt-2">
                {product.description}
                </p>
              </div>
              <div class="mb-4">
                <span class="font-bold dark:text-gray-700 text-gray-300">
                  Product Weight:
                </span>
                <span class="dark:text-gray-600 text-gray-300 ml-2">{product.weight} kg</span>
                
              </div>
              <div class="mb-4">
                <span class="font-bold dark:text-gray-700 text-gray-300">
                  Select Quantity:
                </span>
                <div class=" items-center mt-2">
                  <button class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <div class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                    2
                  </div>
                  <button class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex -mx-2 mb-4">
                <div class="w-1/2 px-2">
                  <button class="w-full dark:bg-gray-900 bg-gray-600 text-white py-2 px-4 rounded-full font-bold dark:hover:bg-gray-800 hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

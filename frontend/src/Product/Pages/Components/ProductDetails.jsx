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
      .get(`http://localhost:5000/product/update/661bc1a3c68f6174031a5eb4`)
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
      <div class="bg-gray-100  py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div class="h-[460px] rounded-lg bg-gray-300  mb-4">
                <img
                  class="w-full h-full object-cover"
                  src={`http://localhost:5000/${product.image}`}
                  alt="Product Image"
                />
              </div>
              
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="text-2xl font-bold text-gray-800  mb-2">
                Product Name
              </h2>
              <p class="text-gray-600  text-sm mb-4">
              {product.name}
              </p>
              <div class="flex mb-4">
                <div class="mr-4">
                  <span class="font-bold text-gray-700 ">
                    Price:
                  </span>
                  <span class="text-gray-600  ml-2" >
                    Rs. {product.price}.00
                  </span>
                </div>
                <div>
                  <span class="font-bold text-gray-700 ">
                    Availability:
                  </span>
                  <span class="text-gray-600  ml-2">{Status === 1 ? <> {product.Stock} in Stock</> : <>Out Of Stock</>}</span>
                </div>
              </div>
              <div class="mb-4">
                <span class="font-bold text-gray-700 ">
                  Product Description:
                </span>
                <p class="text-gray-600  text-sm mt-2">
                {product.description}
                </p>
              </div>
              <div class="mb-4">
                <span class="font-bold text-gray-700 ">
                  Product Weight:
                </span>
                <span class="text-gray-600  ml-2">{product.weight} kg</span>
                
              </div>
              <div class="mb-4">
                <span class="font-bold text-gray-700 ">
                  Select Quantity:
                </span>
                <div class="flex items-center">
                          <button class="border rounded-md py-2 px-4 mr-2">
                            -
                          </button>
                          <span class="text-center w-8">2</span>
                          <button class="border rounded-md py-2 px-4 ml-2">
                            +
                          </button>
                        </div>
              </div>
              <div class="flex -mx-2 mb-4">
                <div class="w-1/2 px-2">
                  <button class="w-full bg-gray-900  text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ">
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

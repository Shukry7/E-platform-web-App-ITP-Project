/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import CustomerHeader from "../../../Shared/Components/UiElements/CustomerHeader";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/product/update/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  let Status = 1;
  if (product.Stock === 0) {
    Status = 0;
  }
  return (
    <>
      <CustomerHeader title={product.name} />
      <main className="w-full flex flex-col lg:flex-row">
        <section className="h-fit flex-col gap-8 mt-16 sm:flex sm:flex-row sm:gap-4 sm:h-full sm:mt-24 sm:mx-2 md:gap-8 md:mx-4 lg:flex-col lg:mx-0 lg:mt-36">
          <picture className="relative flex items-center bg-orange sm:bg-transparent">
            <img
              src={`http://localhost:5000/${product.image}`}
              alt="Product Image"
              className="block sm:rounded-xl xl:w-[70%] xl:rounded-xl m-auto pointer-events-none transition duration-300 lg:w-3/4 lg:pointer-events-auto lg:cursor-pointer lg:hover:shadow-xl"
            />
          </picture>
        </section>
        <section className="w-full p-6 lg:mt-36 lg:pr-20 lg:py-10 2xl:pr-40 2xl:mt-40">
          <h4 className="font-bold text-orange mb-2 uppercase text-xs tracking-widest">
            {product.category}
          </h4>
          <h1 class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <p class="text-dark-grayish mb-6 text-base sm:text-lg">
            {product.description}
          </p>
          <div class="flex items-center justify-between mb-6 sm:flex-col sm:items-start">
            <div class="flex items-center gap-4">
              <h3 class="text-very-dark font-bold text-3xl inline-block">
                Rs.{product.price}.00
              </h3>
            </div>
            <p class="text-dark-grayish w-fit decoration-dark-grayish decoration-1 my-auto">
              {product.Stock} in stock
            </p>
          </div>
          <div class="flex flex-col gap-5 mb-16 sm:flex-row lg:mb-0">
            <div class="w-full bg-gray-100 h-10 text-sm bg-light flex items-center justify-between rounded-lg font-bold relatives sm:w-80">
              <div className="px-3" onClick={() => setQuantity(quantity - 1)}>
                <FaMinus
                  color="orange"
                  size={24}
                  className="hover:cursor-pointer"
                />
              </div>
              <span id="amount" class="select-none">
                {quantity}
              </span>
              <div className="px-3" onClick={() => setQuantity(quantity + 1)}>
                <FaPlus
                  color="Orange"
                  size={24}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
            <button
              class="w-full h-10 bg-orange py-2 flex items-center justify-center gap-4 text-xs rounded-lg font-bold text-light shadow-md shadow-orange hover:brightness-125 transition select-none"
              id="add-cart"
            >
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="hsl(223, 64%, 98%)"
                  fill-rule="nonzero"
                ></path>
              </svg>
              Add to cart
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetails;

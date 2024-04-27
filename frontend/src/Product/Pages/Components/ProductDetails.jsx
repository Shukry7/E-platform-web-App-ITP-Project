/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import CustomerHeader from "../../../Shared/Components/UiElements/CustomerHeader";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { AuthContext } from "../../../Shared/Components/context/authcontext";
import CustomerLoader from "../../../Shared/Components/UiElements/CustomerLoader";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.Stock) {
      setQuantity(quantity + 1);
    }
  };
  let Status = 1;
  if (product.Stock === 0) {
    Status = 0;
  }

  const submithandler = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/cart/cart/new", {
        user: auth.cusId,
        product: product,
        quantity: quantity,
      })
      .then((res) => {
        setLoading(false);
        Toast("Product Added To Cart !!", "success");
        navigate("/Products");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  return (
    <>
      <CustomerHeader title={product.name} />
      <main className="w-full flex flex-col lg:flex-row">
        {loading ? (
          <CustomerLoader />
        ) : (
          <>
            <section className="gap-8 mt-16 pl-56  pr-16 sm:flex-row sm:gap-4 sm:h-full sm:mt-24 sm:mx-2 md:gap-8 md:mx-4 lg:flex-col lg:mx-0 lg:mt-36">
              <div className="w-96 h-96">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt="Product Image"
                  className="block m-auto pointer-events-none transition duration-300 cursor-pointer hover:shadow-xl"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </section>
            <section className="w-full p-6 lg:mt-36 lg:pr-20 lg:py-10 2xl:pr-40 2xl:mt-40">
              <h4 className="font-bold text-orange-600 mb-2 uppercase text-xs tracking-widest">
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
                  {Status === 1 ? (
                    <> {product.Stock} in Stock</>
                  ) : (
                    <>Out Of Stock</>
                  )}
                </p>
              </div>
              <div class="flex flex-col gap-5 mb-16 sm:flex-row lg:mb-0">
                <div class="w-full bg-gray-100 h-10 text-sm bg-light flex items-center justify-between rounded-lg font-bold relatives sm:w-80">
                  <div className="px-3" onClick={handleDecrement}>
                    <FaMinus
                      color="orange"
                      size={24}
                      className="hover:cursor-pointer"
                    />
                  </div>
                  <span id="amount" class="select-none">
                    {quantity}
                  </span>
                  <div className="px-3" onClick={handleIncrement}>
                    <FaPlus
                      color="Orange"
                      size={24}
                      className="hover:cursor-pointer"
                    />
                  </div>
                </div>
                {Status === 1 ? (
                    <> <button
                  class="w-full h-10 bg-orange-600 py-2 flex items-center justify-center gap-4 text-xs rounded-lg font-bold text-white shadow-md shadow-orange hover:brightness-125 transition select-none"
                  id="add-cart"
                  onClick={submithandler}
                >
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Add to cart
                </button></>
                  ) : (
                    <><button
                  class="w-full h-10 bg-orange-600 py-2 flex items-center justify-center gap-4 text-xs rounded-lg font-bold text-white shadow-md shadow-orange hover:brightness-125 transition select-none"
                  id="add-cart"
                  disabled
                >
                  
                  Out Of Stock
                </button></>
                  )}
                
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default ProductDetails;

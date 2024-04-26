import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import { AuthContext } from "../../../Shared/Components/context/authcontext";

const CustomerHeader = (props) => {
  const [count, setCount] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Fetch cart items when component mounts
    axios
      .get(`http://localhost:5000/cart/list/${auth.cusId}`)
      .then((response) => {
        setCount(response.data.length);
      })

      .catch((error) => {
        console.error("Error fetching cart", error);
      });
  }, [auth.cusId]);
  return (
    <>
      <div class=" flex-1 flex flex-col">
        <nav class="px-4 flex justify-between bg-white h-16 border-b-2">
          <ul class="flex items-center">
            <li class="h-6 w-6 flex items-center">
              <img
                class="h-full w-full mx-auto"
                src="https://www.svgrepo.com/show/424912/valorant-logo-play-2.svg"
                alt="Dedsec logo"
              />
              <span class="self-center text-xl font-semibold whitespace-nowrap text-orange-600 dark:text-white ml-2">
                Kandurata Glass House
              </span>
            </li>
          </ul>

          <ul class="flex items-center">
            <li>
              <h1 class="pl-8 lg:pl-0 text-gray-700 font-bold">
                {props.title}
              </h1>
            </li>
          </ul>

          <ul class="flex items-center">
            <li class="pr-6">
              <Link
                to={"/Cart"}
                class="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                aria-label="Cart"
              >
                <FaCartShopping size={25} />
                {count !== 0 && (
                  <span class="absolute inset-0 object-right-top top-6 p-5">
                    <div class="inline-flex items-center px-1.5 py-0.5 border-2 pl- border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                      {count}
                    </div>
                  </span>
                )}
              </Link>
            </li>
            <li class="h-10 w-10">
              <img
                class="h-full w-full rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="profile woman"
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CustomerHeader;

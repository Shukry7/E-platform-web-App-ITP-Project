import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const CustomerHeader = (props) => {
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
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-2">
                DEDSEC
            </span>
        </li>
          </ul>

          <ul class="flex items-center">
            <li>
              <h1 class="pl-8 lg:pl-0 text-gray-700 font-bold">{props.title}</h1>
            </li>
          </ul>

          <ul class="flex items-center">
            <li class="pr-6">
            <button
                type="button"
                class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 z-10"
              >
                <span class="sr-only">View Cart</span>

                <FaCartShopping size={25}/>
              </button>
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

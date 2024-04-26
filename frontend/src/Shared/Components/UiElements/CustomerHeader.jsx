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
            <button class="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
              <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span class="absolute inset-0 object-right-top -mr-6">
                <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  6
                </div>
              </span>
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

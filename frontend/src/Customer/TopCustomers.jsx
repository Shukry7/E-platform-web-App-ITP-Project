import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";



const TopCustomers = () => {
    const [TopCustomers, setTopCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [switchPC, setSwitchPC] = useState(true);
    
    useEffect(() => {
      setLoading(true);
      axios
        .get("http://localhost:5000/customer/Top/Customers")
        .then((res) => {
          setTopCustomers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(true);
        });
    }, []);

    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Customer report",
        onAfterPrint: () => alert("Customer Report is successfully generated !"),
      });
    return (
      <>
        <div class="p-4 min-h-5/6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <h3 class="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Statistics this month
          </h3>

          <button
            onClick={handleprint}
            className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
           >
          Generate Report
        </button>
          
          <ul
            class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400"
            id="fullWidthTab"
            data-tabs-toggle="#fullWidthTabContent"
            role="tablist"
          >
            <li class="w-full">
              <button
                id="about-tab"
                onClick={() => setSwitchPC(false)}
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="true"
                class={`inline-block w-full p-4 rounded-tr-lg ${
                  !switchPC
                    ? "bg-red-400 text-white "
                    : "bg-red-400 text-white "
                }  focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600  dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500`}
              >
                Top Customers
              </button>
            </li>
          </ul>
          <div
            id="fullWidthTabContent"
            class="border-t border-gray-200 dark:border-gray-600"
          >
            
           
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {TopCustomers.map((customer) => {
                  return (
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="w-8 h-8 rounded-full object-cover"
                            src={`http://localhost:5000/${customer.customer.image}`}
                            alt={customer.customer.name}
                          />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="font-medium text-gray-900 truncate dark:text-white">
                          {customer.customer?.name}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {customer.customer?.mail}
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          Rs. {customer.totalAmount}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        
      </>
    );
  };
  
export default TopCustomers;

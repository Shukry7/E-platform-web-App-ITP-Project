import React from "react";
import Navbar from "../Shared/Components/UiElements/Navbar";
import Header from "../Shared/Components/UiElements/header";
import Table from "../Shared/Components/UiElements/Table";
import TableRow from "../Shared/Components/UiElements/TableRow";

const Dashboard = () => {
  const Headings = [
    "#",
    "Product ID",
    "Product name",
    "Alert Quantity",
    "Stock",
    "ReStock",
  ];

  
  return (
    <>
      <Navbar />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="px-4 pt-6 w-full">
          <div className="grid w-full grid-cols-1 gap-4 mt-4 sm:grid-cols-4">
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                  New products
                </h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                  2,340
                </span>
                <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      ></path>
                    </svg>
                    12.5%
                  </span>
                  Since last month
                </p>
              </div>
            </div>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                  New products
                </h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                  2,340
                </span>
                <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      ></path>
                    </svg>
                    12.5%
                  </span>
                  Since last month
                </p>
              </div>
            </div>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                  New products
                </h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                  2,340
                </span>
                <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      ></path>
                    </svg>
                    12.5%
                  </span>
                  Since last month
                </p>
              </div>
            </div>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                  New products
                </h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                  2,340
                </span>
                <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      ></path>
                    </svg>
                    12.5%
                  </span>
                  Since last month
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-1 2xl:grid-cols-3 pt-5">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 class="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Product That Need to Restock
                <svg
                  class="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </h3>
              <div className="border-t border-gray-200 dark:border-gray-600">
                <Table Headings={Headings}>
                  <TableRow>
                    <td class="px-6 py-4">9</td>
                    <td class="px-6 py-4">9</td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      ii
                    </th>
                    <td class="px-6 py-4">k</td>
                    <td
                      class="px-6 py-4"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span style={{ marginRight: "10px" }}>Rs.</span>
                    </td>
                    <td class="px-6 py-4">Hello</td>
                  </TableRow>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

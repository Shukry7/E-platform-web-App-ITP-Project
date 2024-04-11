import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewPopup = (props) => {
  const [loading, setLoading] = useState(false);
  const [product, setproduct] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/product/update/${props.id}`)
      .then((res) => {
        setproduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props.id]);

  console.log(product.image);
  return (
    <>
      {props.click && (
        <>
          <div
            id="crud-modal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <button
              onClick={() => {
                props.setclick(!props.click);
              }}
              type="button"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 fixed top-5 right-10 "
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div class="flex flex-col justify-center h-screen">
              <div class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-5xl mx-auto border border-white bg-white">
                <div class="w-full md:w-4/6 bg-white grid place-items-center ">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt="tailwind logo"
                    class="rounded-xl w-full h-full object-cover"
                  />
                </div>
                <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center my-2 ml-3 d dark:text-black ">
                    Product Details
                  </h2>
                  <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Product Name
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.name}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">ID</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.ID}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Category
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.category}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Selling Price
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Rs {product.price}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Description
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.description}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Weight</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.weight}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Quantity In Stock
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.Stock}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Alert Quantity
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.Alert_quantity}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Created At
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(product.createdAt).toString()}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Updated At
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(product.updatedAt).toString()}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row justify-center mt-5 space-y-3 md:space-y-0">
              <div class="relative dark:text-black pl-11 mb-5">
                <div class="relative p-6 pl-4 bg-white dark:bg-white-800 border-2 dark:border-gray-300 rounded-lg ">
                  <div class="flex items-center text-center">
                    <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-black text-center">
                      Supplier details
                    </h3>
                  </div>
                  <table class="min-w-full bg-white shadow-md rounded-xl">
                    <thead>
                      <tr class="bg-blue-gray-100 text-gray-700">
                        <th class="py-3 px-4 text-left columns-2 font-bold">
                          Supplier Name
                        </th>
                        <th class="py-3 px-4 text-left columns-2 font-bold">
                          ID
                        </th>
                        <th class="py-3 px-4 text-left columns-2 font-bold">
                          Cost
                        </th>
                        <th class="py-3 px-4 text-left columns-2 font-bold">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-blue-gray-900">
                      <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4">Mufeez</td>
                        <td class="py-3 px-4 ">S0003</td>
                        <td class="py-3 px-4">Rs 50</td>
                        <td class="py-3 px-4">
                          <a
                            href="#"
                            class="font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4">Mufeez</td>
                        <td class="py-3 px-4">S0003</td>
                        <td class="py-3 px-4">Rs 50</td>
                        <td class="py-3 px-4">
                          <a
                            href="#"
                            class="font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4">Mufeez</td>
                        <td class="py-3 px-4">S0003</td>
                        <td class="py-3 px-4">Rs 50</td>
                        <td class="py-3 px-4">
                          <a
                            href="#"
                            class="font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewPopup;

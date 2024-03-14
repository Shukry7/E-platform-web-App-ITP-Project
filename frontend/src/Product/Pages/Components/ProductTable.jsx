import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./ProductTable.css";
import Button from "../../../Shared/Components/FormElements/Button";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const ProductTable = (props) => {
  const deleteHandle = (id) => {
    props.setloading(true);
    axios
      .delete(`http://localhost:5000/product/${id}`)
      .then((res) => {
        props.setloading(false);
        Navigate("/Product");
      })
      .catch((err) => {
        console.error(err);
        props.setloading(false);
      });
  };

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Selling Price
              </th>
              <th scope="col" class="px-6 py-3">
                Available
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <center>
                <Loader />
              </center>
            ) : (
              props.Product.map((item, index) => {
                return (
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td class="px-6 py-4">{item.category}</td>
                    <td class="px-6 py-4">Rs.{item.price}</td>
                    <td class="px-6 py-4">{item.quantity}</td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;

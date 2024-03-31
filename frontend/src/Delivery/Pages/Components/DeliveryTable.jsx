import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./DeliveryTable.css";
import Button from "../../../Shared/Components/FormElements/Button";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";

const DeliveryTable = (props) => {
  const deleteHandle = (id) => {
    props.setloading(true);
    axios
      .delete(`http://localhost:5000/delivery/${id}`)
      .then((res) => {
        props.setloading(false);
        Navigate("/Delivery");
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
                Delivery Person Name
              </th>
              <th scope="col" class="px-6 py-3">
                Telephone
              </th>
              <th scope="col" class="px-6 py-3">
                Mail
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                License Number
              </th>
              <th scope="col" class="px-6 py-3">
                Number Plate
              </th>
              <th scope="col" class="px-6 py-3">
                Type
              </th>
              <th scope="col" class="px-6 py-3">
                Capacity
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
              props.Delivery.map((item, index) => {
                return (
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td class="px-6 py-4">{item.telephone}</td>
                    <td class="px-6 py-4">{item.mail}</td>
                    <td class="px-6 py-4">{item.address}</td>
                    <td class="px-6 py-4">{item.license}</td>
                    <td class="px-6 py-4">{item.numberplate}</td>
                    <td class="px-6 py-4">{item.type}</td>
                    <td class="px-6 py-4">{item.capacity}</td>
                    <td class="px-6 py-4">
                      <Link to={'/Delivery/delete/'+item._id}>
                        delete
                      </Link>
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

export default DeliveryTable;

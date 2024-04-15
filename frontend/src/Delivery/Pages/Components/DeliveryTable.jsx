import React from "react";

import "./DeliveryTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";

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

  const Headings = [
    "#",
    "Delivery Person ID",
    "Delivery Person Name",
    "Telephone",
    "Mail",
    "Address",
    "License Number",
    "Number Plate",
    "Type & Capacity",  
    "Action",
  ];

  return (
    <>
      <Table Headings={Headings}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.Delivery.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.ID}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td class="px-6 py-4">{item.telephone}</td>
                  <td class="px-6 py-4">{item.mail}</td>
                  <td class="px-6 py-4">{item.address}, {item.city}</td>
                  <td class="px-6 py-4">{item.license}</td>
                  <td class="px-6 py-4">{item.numberplate}</td>
                  <td class="px-6 py-4">{item.type}({item.capacity}kg)</td>
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    link1=""
                    link2={`/Delivery/update/` + item._id}
                    deletelink={`http://localhost:5000/delivery/${item._id}`}
                    dlt={props.dlt}
                    />
                  </td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default DeliveryTable;

import React from "react";

import "./ProductTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Popup from "./Popup";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";


const ProductTable = (props) => {
  const Headings = [
    "#",
    "Product ID",
    "Product name",
    "Category",
    "Selling Price",
    "Available",
    "Alert Quantity",
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
          props.Product.map((item, index) => {
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
                <td class="px-6 py-4">{item.category}</td>
                <td class="px-6 py-4">
                  Rs.{item.price}
                  <Popup id={item._id} />
                </td>
                <td class="px-6 py-4">{item.Stock}</td>
                <td class="px-6 py-4">{item.Alert_quantity}</td>
                <td class="px-6 py-4">
                  <ThreeDotDropdown
                    popup
                    id={item._id}
                    link2={`/Product/update/` + item._id}
                    deletelink={`http://localhost:5000/product/${item._id}`}
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

export default ProductTable;

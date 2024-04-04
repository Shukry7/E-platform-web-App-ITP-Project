import React from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";

const SupplierProductTable = (props) => {

  const Headings = [
    "#",
    "Product id",
    "Product name",
    "Unit Price",
  ];

  return (
    <>
      <Table Headings={Headings}>
          {props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.supplierProducts.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.product.ID}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.product.name}
                  </th>
                  <td class="px-6 py-4">{item.unitPrice}</td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default SupplierProductTable;

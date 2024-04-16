import React, { useState } from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import DeleteConfirmBox from "../../../Shared/Components/UiElements/DeleteConfirmBox";
import UpdatePrice from "./UpdatePrice";

const SupplierProductTable = (props) => {

  const [cart, setCart] = useState("");



  console.log("cart is"+cart)

  const Headings = [
    "#",
    "Product id",
    "Product name",
    "Unit Price",
    "Action",
    "Cart"
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
                  <td class="px-6 py-4" style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '10px'}}>Rs.{item.unitPrice}</span>
                    <UpdatePrice id={item._id} />
                  </td>
                  <td className="px-6 py-4"><DeleteConfirmBox deleteLink={`http://localhost:5000/supplierproduct/${item._id}`} dlt={props.dlt}/></td>
                  <td className="px-6 py-4">
                    <button onClick={()=> setCart(...item._id)}>Add</button>
                  </td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default SupplierProductTable;

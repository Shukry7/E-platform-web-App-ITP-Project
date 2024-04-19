import React, {useState} from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import PopUpPurchase from "./PopUpPurchase";

const PendingPurchaseTable = (props) => {

  const [pid, setPid] = useState();

  const submitHandler = async (itemId) => {
 
    console.log(itemId)
    axios
      .put(`http://localhost:5000/supplierproduct/confirmDelivery/${itemId}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const Headings = [
    "#",
    "Purchase ID",
    "Total Bill",
    "Paid Amount",
    "Date",
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
            props.Purchase.map((item, index) => {
                if(item.status == 'Pending'){
                    return (
                        <TableRow>
                        <td class="px-6 py-4">{index + 1}</td>
                        <td class="px-6 py-4">{item.ID}</td>
                        <td class="px-6 py-4">{item.total}</td>
                        <td class="px-6 py-4">{item.paidAmount}</td>
                        <td class="py-4">{item.date}</td>
                        <td class="py-3">
                            <PopUpPurchase
                                id = {item._id}
                            />
                            <button onClick={() => submitHandler(item._id)} type="button" class="mt-3 text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-500">Confirm delivery</button>
                        </td>
                        </TableRow>
                    );
                }})
          )}
      </Table>
    </>
  );
};

export default PendingPurchaseTable;

import React from "react";

import "./SupplierTable.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const SupplierTable = (props) => {
  const deleteHandle = (id) => {
    props.setloading(true);
    axios
      .delete(`http://localhost:5000/supplier/${id}`)
      .then((res) => {
        props.setloading(false);
        Navigate("/Supplier");
      })
      .catch((err) => {
        console.error(err);
        props.setloading(false);
      });
  };

  const Headings = [
    "#",
    "Supplier ID",
    "Supplier name",
    "Telephone",
    "Email",
    "Address",
    "Credit",
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
            props.Suppliers.map((item, index) => {
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
                  <td class="px-6 py-4">{item.address}</td>
                  <td class="px-6 py-4">{item.credit}</td>
                  <td class="px-6 py-4 flex justify-center gap-2">
                    <Link to={'/Supplier/delete/'+item._id}>
                      <MdDeleteForever />
                    </Link>
                    <Link to={'/Supplier/delete/'+item._id}>
                      <MdDeleteForever />
                    </Link>
                  </td>
                </TableRow>
              );
            })
          )}
      </Table>
    </>
  );
};

export default SupplierTable;

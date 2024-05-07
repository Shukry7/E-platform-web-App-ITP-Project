import React from "react";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import Popup from "../../../Delivery/Pages/Components/Popup";

const DeliveryTable = (props) => {
  const Headings = [
    "#",
    "ID",
    "Name",
    "Telephone",
    "Mail",
    "Address",
    "License Number",
    "Number Plate",
    "Type & Capacity",
    "Action",
    "Action",
    "PUsername & Password",
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
              <TableRow key={item._id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.ID}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.telephone}</td>
                <td className="px-6 py-4">{item.mail}</td>
                <td className="px-6 py-4">{item.address}, {item.city}</td>
                <td className="px-6 py-4">{item.license}</td>
                <td className="px-6 py-4">{item.numberplate}</td>
                <td className="px-6 py-4">{item.type}({item.capacity}kg)</td>
                <td className="px-6 py-4">
                  <ThreeDotDropdown
                    link1={`/Delivery/view/${item._id}`}
                    link2={`/Delivery/update/${item._id}`}
                    deleteLink={`http://localhost:5000/delivery/${item._id}`}
                    dlt={props.dlt}
                    dltset={props.dltset}
                  />
                </td>
                <td className="px-6 py-4">
                  <Popup deliveryId={item._id} />
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Card from "../../../Shared/Components/UiElements/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignDelivery = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Fetch orders data from the API
    axios
      .get("http://localhost:5000/order")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch delivery persons data from the API
    axios
      .get("http://localhost:5000/delivery")
      .then((res) => {
        setDeliveryPersons(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSelectChange = (e, orderId) => {
    const personId = e.target.value;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [orderId]: personId
    }));
  };

  const handleDeliveryComplete = (orderId) => {
    const selectedPersonId = selectedOptions[orderId];
    if (selectedPersonId) {
      // Remove the completed order from the orders state
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );

      // Free up the assigned delivery person
      setSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = { ...prevSelectedOptions };
        delete updatedOptions[orderId];
        return updatedOptions;
      });

      // Display toast message
      toast.success("Delivery is Completed!");
    }
  };

  const Headings = [
    "Order ID",
    "Customer Name",
    "Assign Delivery Persons",
    "Assigned Delivery Person",
    "Action"
  ];

  const getAvailablePersons = (currentOrderId) => {
    const selectedPersonIds = Object.values(selectedOptions).filter(
      (personId) => personId !== "" && personId !== null
    );
    const selectedPersonId = selectedOptions[currentOrderId];

    return deliveryPersons.filter(
      (person) =>
        !selectedPersonIds.includes(person.ID) ||
        person.ID === selectedPersonId
    );
  };

  return (
    <Card style={{ width: "100%" }}>
      <div className="justify-between items-center">
        <div className="p-8">
          <h1 className="text-3xl mb-8">Assign Delivery Persons</h1>
          <div className="table-container">
            <Table Headings={Headings}>
              {loading ? (
                <tr>
                  <td colSpan="5">
                    <Loader />
                  </td>
                </tr>
              ) : (
                orders.map(({ orderId, userId }) => {
                  const selectedPersonId = selectedOptions[orderId];
                  const availablePersons = getAvailablePersons(orderId);

                  return (
                    <TableRow key={orderId}>
                      <td className="px-6 py-4">{orderId}</td>
                      <td className="px-6 py-4">{userId.name}</td>
                      <td className="px-6 py-4">
                        <select
                          className="border border-gray-300 rounded px-4 py-2 mr-4"
                          value={selectedPersonId || ""}
                          onChange={(e) => handleSelectChange(e, orderId)}
                        >
                          <option key="" value="">
                            Select a Delivery Person
                          </option>
                          {availablePersons.map((person) => (
                            <option key={person.ID} value={person.ID}>
                              {person.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td
                        className="px-6 py-4"
                        style={{
                          color:
                            availablePersons.length === 0
                              ? "red"
                              : selectedPersonId
                              ? "green"
                              : "red"
                        }}
                      >
                        {availablePersons.length === 0
                          ? "No Delivery Person Available"
                          : selectedPersonId
                          ? deliveryPersons.find(
                              (person) => person.ID === selectedPersonId
                            )?.name || "Not Assigned"
                          : "Not Assigned"}
                      </td>
                      <td>
                        {selectedPersonId && (
                          <button
                            onClick={() => handleDeliveryComplete(orderId)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Complete Delivery
                          </button>
                        )}
                      </td>
                    </TableRow>
                  );
                })
              )}
            </Table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssignDelivery;

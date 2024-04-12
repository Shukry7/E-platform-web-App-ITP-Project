import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Card from "../../../Shared/Components/UiElements/Card";

const AssignDelivery = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/delivery")
      .then((res) => {
        setDeliveryPersons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelectChange = (e, paymentId) => {
    const personId = e.target.value;

    // Update selected options
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [paymentId]: personId
    }));
  };

  const Headings = [
    "Payment ID",
    "Customer Name",
    "Assign Delivery Persons",
    "Assigned Delivery Person"
  ];

  useEffect(() => {
    console.log("Selected Options:", selectedOptions);
  }, [selectedOptions]);

  const getAvailablePersons = (currentPaymentId) => {
    const selectedPersonIds = Object.values(selectedOptions).filter(
      (personId) => personId !== "" && personId !== null
    );
    return deliveryPersons.filter(
      (person) =>
        !selectedPersonIds.includes(person.ID) ||
        selectedOptions[currentPaymentId] === person.ID
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
                  <td colSpan="4">
                    <Loader />
                  </td>
                </tr>
              ) : (
                [
                  { paymentId: "P0001", customerName: "Alice Johnson" },
                  { paymentId: "P0005", customerName: "David Smith" },
                  { paymentId: "P0008", customerName: "Emily Brow" },
                  { paymentId: "P0009", customerName: "Carl Johnson" }
                ].map(({ paymentId, customerName }) => {
                  const selectedPersonId = selectedOptions[paymentId];
                  const availablePersons = getAvailablePersons(paymentId);

                  return (
                    <TableRow key={paymentId}>
                      <td className="px-6 py-4">{paymentId}</td>
                      <td className="px-6 py-4">{customerName}</td>
                      <td className="px-6 py-4">
                        <select
                          className="border border-gray-300 rounded px-4 py-2 mr-4"
                          value={selectedPersonId || ""}
                          onChange={(e) => handleSelectChange(e, paymentId)}
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
                      <td className="px-6 py-4" style={{ color: availablePersons.length === 0 ? "red" : selectedPersonId ? "green" : "red" }}>
                        {availablePersons.length === 0
                          ? "No Delivery Person Available"
                          : selectedPersonId
                            ? deliveryPersons.find(
                                (person) => person.ID === selectedPersonId
                              )?.name || "Not Assigned"
                            : "Not Assigned"}
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Card from "../../../Shared/Components/UiElements/Card";

const AssignDelivery = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState({});
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
    setSelectedPersons({
      ...selectedPersons,
      [paymentId]: personId,
    });
  };

  const getAvailablePersons = (paymentId) => {
    const selectedId = selectedPersons[paymentId];
    return deliveryPersons.filter(
      (person) =>
        !Object.values(selectedPersons).includes(person.id) ||
        person.id === selectedId
    );
  };

  const Headings = ["Payment ID", "Customer Name", "Assign Delivery Persons"];

  return (
    <Card style={{ width: "100%" }}>
      <div className="justify-between items-center">
        <div className="p-8">
          <h1 className="text-3xl mb-8">Assign Delivery Persons</h1>
          <div className="table-container">
            <Table Headings={Headings}>
              {loading ? (
                <tr>
                  <td colSpan="3">
                    <Loader />
                  </td>
                </tr>
              ) : (
                [
                  { paymentId: "P0001", customerName: "Alice Johnson" },
                  { paymentId: "P0005", customerName: "David Smith" },
                  { paymentId: "P0009", customerName: "Emily Brow" },
                ].map(({ paymentId, customerName }) => (
                  <TableRow key={paymentId}>
                    <td className="px-6 py-4">{paymentId}</td>
                    <td className="px-6 py-4">{customerName}</td>
                    <td className="px-6 py-4">
                      <select
                        className="border border-gray-300 rounded px-4 py-2 mr-4"
                        value={selectedPersons[paymentId] || ""}
                        onChange={(e) => handleSelectChange(e, paymentId)}
                      >
                        <option key="" value="">
                          Select a Delivery Person
                        </option>
                        {getAvailablePersons(paymentId).map((person) => (
                          <option key={person.id} value={person.id}>
                            {person.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </TableRow>
                ))
              )}
            </Table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssignDelivery;


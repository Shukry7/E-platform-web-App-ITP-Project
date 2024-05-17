import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";

const BillingUI = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [val, setVal] = useState(null);

  const addItem = (item) => {
    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem._id === item._id
    );
  
    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].total =
        updatedItems[existingItemIndex].quantity * item.price;
  
      setSelectedItems(updatedItems);
    } else {
      // If the item doesn't exist, add it with quantity 1
      setSelectedItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1, total: item.price },
      ]);
    }
  
    setTotalItems((prevTotalItems) => prevTotalItems + 1);
    setTotalAmount(
      (prevTotalAmount) => parseFloat(prevTotalAmount) + parseFloat(item.price)
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (value) => {
    setVal(value);
    const selectedProduct = products.find(
      (product) => product._id === value.value
    );
    if (selectedProduct) {
      addItem(selectedProduct);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index].quantity = quantity;
    newSelectedItems[index].total =
      parseFloat(newSelectedItems[index].price) * parseInt(quantity);

    setSelectedItems(newSelectedItems);

    const newTotalAmount = newSelectedItems.reduce(
      (acc, item) => acc + parseFloat(item.total),
      0
    );
    setTotalAmount(newTotalAmount);
  };

  const handleDelete = (index) => {
    const itemToRemove = selectedItems[index];
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);

    setSelectedItems(newSelectedItems);
    setTotalItems((prevTotalItems) => prevTotalItems - 1);
    setTotalAmount(
      (prevTotalAmount) =>
        parseFloat(prevTotalAmount) - parseFloat(itemToRemove.total)
    );
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-4">Add Billing Items</h2>
          <div className="relative mb-4">
            <Select
              isSearchable
              value={val}
              primaryColor={"red"}
              onChange={handleChange}
              options={products.map((product) => ({
                value: product._id,
                label: `${product.ID} ${product.name} Price: Rs.${product.price} Stock: ${product.Stock}`,
              }))}
            />
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
                <td className="border border-gray-300 p-2">{item.ID}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full border border-gray-300 p-2"
                    value={item.quantity}
                    min="1"
                    max={item.Stock}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    />
                </td>
                <td className="border border-gray-300 p-2">Rs.{item.price}</td>
                <td className="border border-gray-300 p-2">Rs.{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Right Side: Invoice Summary */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4">Invoice Summary</h2>
            <div className="border p-4 rounded mb-4">
              <p>Total Items: {totalItems}</p>
              <p>Total Amount: Rs. {totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded mt-4">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingUI;

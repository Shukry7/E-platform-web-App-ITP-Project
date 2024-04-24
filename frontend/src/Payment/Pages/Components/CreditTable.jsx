import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./CreditTable.css";
import { Link } from "react-router-dom";
import DeleteConfirmBox from "../../../Shared/Components/UiElements/DeleteConfirmBox";
import { AuthContext } from "../../../Shared/Components/context/authcontext";

function CardList() {
  const [cards, setCards] = useState([]);
  const [deleteCart, setdeleteCart] = useState(1);
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Fetch cart items when component mounts
    axios
      .get(`http://localhost:5000/OnPay/onpay/list/${auth.cusId}`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart", error);
      });
  }, []);

  const handleUseCard = async () => {
    try {
      const cartResponse = await axios.get("http://localhost:5000/Cart/cart");
      const cartItems = cartResponse.data;
     

      const response = await axios.post("http://localhost:5000/order/new", {
        uid : auth.cusId,
        cartitem : cartItems
      });
      console.log("Order placed successfully:");
      // Handle success (e.g., display a success message)
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Number
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              Expire Date
            </th>
            <th scope="col" class="px-6 py-3">
              CVV
            </th>
            <th scope="col" class="px-6 py-3">
              Usage
            </th>
            <th scope="col" class="px-6 py-3">
              Edit
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr
              key={card._id}
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {card.firstname} {card.lastname}
              </th>
              <td class="px-6 py-4">{card.number}</td>
              <td class="px-6 py-4">{card.category}</td>
              <td class="px-6 py-4">{card.expiredate}</td>
              <td class="px-6 py-4">{card.cvv}</td>
              <td class="px-6 py-4">
                <button
                  onClick={() => handleUseCard()}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Use
                </button>
              </td>
              <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <Link to={`/CC/${card._id}`}> Update</Link>
              </td>
              <td class="px-6 py-4">
                <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <DeleteConfirmBox
                    deleteLink={`http://localhost:5000/OnPay/${card._id}`}
                    dlt={deleteCart}
                    dltset={setdeleteCart}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardList;

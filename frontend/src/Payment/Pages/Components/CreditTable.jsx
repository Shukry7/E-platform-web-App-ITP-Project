import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./CreditTable.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DeleteConfirmBox from "../../../Shared/Components/UiElements/DeleteConfirmBox";
import { AuthContext } from "../../../Shared/Components/context/authcontext";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

function CardList() {
  const [cards, setCards] = useState([]);
  const [deleteCart, setdeleteCart] = useState(1);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

   // Extract subtotal, shipping fee, and total from query parameters
   const subtotal = queryParams.get("subtotal");
   const shippingFee = queryParams.get("shippingFee");
   const total = queryParams.get("total");
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

  const handleUseCard = async (cardId) => {
    try {
      const cartResponse = await axios.get(`http://localhost:5000/cart/list/${auth.cusId}`);
      const cartItems = cartResponse.data;
  
      const response = await axios.post("http://localhost:5000/order/new", {
        uid: auth.cusId,
        cartitem: cartItems
      });
  
      console.log("Order placed successfully:", response.data);
  
      for (const item of cartItems) {
        await axios.delete(`http://localhost:5000/cart/${item._id}`);
        console.log("Cart item deleted successfully:", item._id);
      }
      console.log(subtotal,shippingFee,total);
      await axios.post("http://localhost:5000/payment/submit", {
        subtotal: subtotal,
        shippingFee: shippingFee,
        total: total,
        card_id: cardId, // Pass the card_id parameter
        user_id: auth.cusId ,// Pass the user_id parameter
        method: "Online"// Pass the method parameter
      });
      Toast("Payment Completed!!" , "success")
      navigate('/Products');
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
                  onClick={() => handleUseCard(card._id)}
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

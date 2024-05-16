import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const OrderReportTable = ({ date, componentRef }) => {
  const [orders, setOrders] = useState([]);
  const currentDate = new Date().toLocaleDateString();
  let quantity=0;

  useEffect(() => {
    axios
      .get("http://localhost:5000/order/orders", {
        params: {
          startDate: date.startDate || moment().startOf("month").format("YYYY-MM-DD"),
          endDate: date.endDate || moment().endOf("month").format("YYYY-MM-DD"),
        },
      })
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [date]);

  const totalOrders = orders.length;
  const uniqueUsers = new Set(orders.map(order => order.userId)).size;

  return (
    <div className="container mx-auto my-8" ref={componentRef}>
      <h1 className="text-3xl font-bold mb-2">
        Order Report : {date.startDate}
        {" - "}
        {date.endDate}
      </h1>
      <p className="mb-4">
        <strong>Business Name:</strong> Kandurata Glass and Locks
        <br />
        <strong>Address:</strong> kandy street matale
        <br />
        <strong>Date:</strong> {currentDate}
      </p>
      <div className="mt-4 w-full min-h-44 overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none ">
        <table
          id="example"
          className="table-auto bg-[#222E3A]/[6%] overflow-scroll md:overflow-auto w-full text-left font-inter border "
        >
          <thead className="rounded-lg text-base text-white font-semibold w-full">
            <tr className="bg-[#222E3A]/[6%]">
              <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Order Id
              </th>
              <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                User Id
              </th>
              <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Total Items
              </th>
              <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                className={`${index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"}`}
                key={index}
              >
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    index === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  {order.orderId}
                </td>
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    index === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  {order.CartItems.map((item, index) => (
                    <span key={index}>
                      {item.productId.name} ({item.quantity})
                      
                      <br />
                    </span>
                    
                  ))}
                </td>
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    index === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  {quantity}
                </td>
                {quantity=0}
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    index === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h1 className="text-lg ">
          <b>Summary Information:</b>
        </h1>
        <p>
          <b>Total Orders : </b>
          {totalOrders}
        </p>
        <p>
          <b>Unique Users Who Ordered :</b> {uniqueUsers}
        </p>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="text-left ">
          <p>Date of Approval: {currentDate}</p>
        </div>
        <div>
          <p>Signature of Authorized Person</p>
        </div>
      </div>
      
    </div>
  );
};

export default OrderReportTable;

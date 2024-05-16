import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Loader from '../../../Shared/Components/UiElements/Loader';
import Table from '../../../Shared/Components/UiElements/Table';
import axios from 'axios';
import TableRow from '../../../Shared/Components/UiElements/TableRow';

const ProfitReportDetails = () => {
  const [loading, setLoading] = useState(false);
  const [profit, setProfit] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [filteredProfit, setFilteredProfit] = useState([]);
  const [summary, setSummary] = useState({
    totalQuantity: 0,
    totalSales: 0,
    totalProfit: 0,
    mostSoldProduct: '',
    mostSoldProductQuantity: 0,
    mostProfitableProduct: '',
    mostProfitableProductProfit: 0,
    mostSalesProduct: '',
    mostSalesProductAmount: 0,
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/profit/profit/`)
      .then((response) => {
        setProfit(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchase:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (year && month !== '') {
      const filtered = profit.filter(item => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === parseInt(month) &&
          itemDate.getFullYear() === parseInt(year)
        );
      });

      const combined = filtered.reduce((acc, item) => {
        const existingProduct = acc.find(
          (product) => product.product === item.product
        );

        if (existingProduct) {
          existingProduct.quantity += item.quantity;
          existingProduct.totalSale += item.quantity * item.price;
          existingProduct.totalProfit += item.profit;
        } else {
          acc.push({
            productID: item.productID,
            productName: item.productName,
            quantity: item.quantity,
            totalSale: item.quantity * item.price,
            totalProfit: item.profit,
          });
        }

        return acc;
      }, []);

      const totalQuantity = combined.reduce((sum, item) => sum + item.quantity, 0);
      const totalSales = combined.reduce((sum, item) => sum + item.totalSale, 0);
      const totalProfit = combined.reduce((sum, item) => sum + item.totalProfit, 0);

      const mostSoldProduct = combined.reduce((max, item) => 
        item.quantity > max.quantity ? item : max, combined[0] || {product: '', quantity: 0, totalSale: 0}
      );
      
      const mostProfitableProduct = combined.reduce((max, item) => 
        item.totalProfit > max.totalProfit ? item : max, combined[0] || {product: '', totalProfit: 0}
      );

      const mostSalesProduct = combined.reduce((max, item) => 
        item.totalSale > max.totalSale ? item : max, combined[0] || {product: '', totalSale: 0}
      );

      setSummary({
        totalQuantity,
        totalSales,
        totalProfit,
        mostSoldProduct: mostSoldProduct.productName,
        mostSoldProductQuantity: mostSoldProduct.quantity,
        mostProfitableProduct: mostProfitableProduct.productName,
        mostProfitableProductProfit: mostProfitableProduct.totalProfit,
        mostSalesProduct: mostSalesProduct.productName,
        mostSalesProductAmount: mostSalesProduct.totalSale,
      });

      setFilteredProfit(combined);
    }
  }, [year, month, profit]);

  const currentDate = new Date().toLocaleDateString();
  const componentRef = useRef();

  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Profit report",
    onAfterPrint: () => alert("Profit Report is successfully generated!"),
  });

  return (
    <div className="container mx-auto my-8 mt-10">
      <div className="flex items-center justify-between mt-40 mb-4">
        <div className="mr-4">
          <label htmlFor="month" className="mr-2">
            Month:
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>Select month</option>
            {monthNames.map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
        </div>
        <div className="mr-4">
          <label htmlFor="year" className="mr-2">
            Year:
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="YYYY"
            min="2000"
            max="2100"
          />
        </div>
        <button
          onClick={handleprint}
          className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Generate Report
        </button>
      </div>

      <div className="container mx-auto my-8" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-2">Profit Report: {monthNames[month]}/{year}</h1>
        <p className="mb-4">
          <strong>Business Name:</strong> Kandurata Glass and Locks
          <br />
          <strong>Address:</strong> Kandy street matale
          <br />
          <strong>Date:</strong> {currentDate}
        </p>
        <div className="mt-4">
          {loading ? (
            <div className="mt-8">
              <Loader />
            </div>
          ) : (
            <React.Fragment>
              <Table
                Headings={["Product", "Quantity", "Total Sale", "Total Profit"]}
                style={{ width: "100%" }}
              >
                {filteredProfit.map((item, index) => (
                  <TableRow key={index}>
                    <td className="text-center">{item.product}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">{item.totalSale}</td>
                    <td className="text-center">{item.totalProfit}</td>
                  </TableRow>
                ))}
              </Table>
              <div className="mt-4">
                <h1 className="text-lg">
                  <b>Summary Information:</b>
                </h1>
                <p><b>Total Quantity sold :</b> {summary.totalQuantity}</p>
                <p><b>Total sales :</b> Rs.{summary.totalSales}.00</p>
                <p><b>Total profit :</b> Rs.{summary.totalProfit}.00</p>
                <p><b>Most sold product :</b> {summary.mostSoldProduct} with {summary.mostSoldProductQuantity} units sold</p>
                <p><b>Most sales product :</b> {summary.mostSalesProduct} with Rs.{summary.mostSalesProductAmount}.00 in sales</p>
                <p><b>Most profitable product :</b> {summary.mostProfitableProduct} with Rs.{summary.mostProfitableProductProfit}.00 in profit</p>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <div className="text-left">
            <p>Date of Approval: {currentDate}</p>
          </div>
          <div>
            <p>Signature of Authorized Person</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitReportDetails;

import React, { useEffect, useState } from "react";
import Table from "../../Shared/Components/UiElements/Table";
import TableRow from "../../Shared/Components/UiElements/TableRow";
import Loader3 from "../../Shared/Components/UiElements/loader3";
import axios from "axios";
import SupplierDetails from "./SupplierDetails";

const Restock = () => {
  const Headings = ["#", "Product ID", "Product name", "Stock", "ReStock"];

  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product/RestockProduct/")
      .then((res) => {
        setproducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, []);
  return (
    <>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h3 class="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Product That Need to Restock
          <svg
            class="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </h3>
        <div className="border-t border-gray-200 dark:border-gray-600">
          {loading ? (
            <center>
              <Loader3 />
            </center>
          ) : (
            <Table Headings={Headings}>
              {products.map((item, index) => {
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

                    <td
                      class="px-6 py-4"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span style={{ marginRight: "10px" }}>
                        {item.Stock} ({item.Alert_quantity})
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <SupplierDetails id={item._id}/>
                    </td>
                  </TableRow>
                );
              })}
            </Table>
          )}
        </div>
        
        
        
      </div>
    </>
  );
};

export default Restock;

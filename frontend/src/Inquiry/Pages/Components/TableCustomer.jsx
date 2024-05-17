import React from "react";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "./customerUI/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import Button from "./button";
const InquiryTable = (props) => {
  const navigate = useNavigate();
  const Headings = [
    "#",
    "type",
    "subject",
    "status",
    "Date Created",
    "Action",
    
  ];

  return (
    <>
      <Table Headings={Headings} style={{ width: '80%' }} >
        
{props.loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            props.inquiry.map((item, index) => {
              return (
                <TableRow>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{item.type}</td>
                  <td class="px-6 py-4">{item.subject}</td>
                  <td class="px-6 py-4">{item.status}</td>
                  <td class="px-6 py-4">{item.createdAt}</td>
                  <td class="px-6 py-4">
                    <ThreeDotDropdown
                    link1={`/inquiries/view/`+ item._id}
                    link2={`/inquiry_admin/update/`+ item._id}
                    deleteLink={`http://localhost:5000/inquiry_admin/${item._id}`}
                    dlt={props.dlt}
                    dltset={props.dltset}
                    />
                  </td>
                </TableRow>
              );
            })
          )}    
      </Table>
    </>
  );
};

export default InquiryTable;


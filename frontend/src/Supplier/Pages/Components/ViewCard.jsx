import * as React from "react";
import { useEffect } from 'react';
import "./ViewCard.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";

const ViewCard = (props) => {
  return (
    props.loading1 ? (
      <center>
        <Loader />
      </center>
    ) : (
      <div className="max-w-screen-md mx-auto flex justify-center items-center">
        <div className="sample_container card_sample">
          <div className="e-card e-custom-card relative mx-auto overflow-visible border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500">
            <div className="e-card-header text-center">
              <div className="flex justify-center">
                <div className="e-avatar-circle e-avatar-md flex items-center justify-center">
                  <img
                    className="rounded-full w-24 h-24"
                    src={`http://localhost:5000/${props.supplier.image}`}
                    alt="profile_pic"
                  />
                </div>
              </div>
              &nbsp;
            </div>
            <div className="e-card-header">
              <div className="e-card-header-caption center">
                <div className="e-card-header-title name text-lg font-semibold">
                  {props.supplier.name}
                </div>
                <div className="e-card-sub-title text-sm"></div>
              </div>
            </div>
            <div className="e-card-content">
              <p className="avatar-content">
                Supplier ID: {props.supplier.ID}
              </p>
              <p className="avatar-content">
                Telephone: {props.supplier.telephone}
              </p>
              <p className="avatar-content">
                Email: {props.supplier.mail}
              </p>
              <p className="avatar-content">
                Address: {props.supplier.address}
              </p>
              <p className="avatar-content">
                Credit: {props.supplier.credit}
              </p>
            </div>
            <Link
                to={`/Supplier/update/`+ props.supplier._id}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-full text-center"
              >
                Update
              </Link>
          </div>
        </div>
      </div>
    )
  );
};
export default ViewCard;
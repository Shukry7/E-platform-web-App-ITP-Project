import * as React from "react";
import { useEffect } from 'react';
import "./ViewCard.css";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { Link } from "react-router-dom";
import BackButton from "./backbutton";
const ViewCard = (props) => {
  return (
    props.loading ? (
      <center>
        <Loader />
      </center>
    ) : (
      
        <div className="sample_container card_sample ml-60" style={{ width: "50%", height:"80%", marginTop: "0px"}}>
          <div className="e-card e-custom-card relative mx-auto bg-white border rounded-lg shadow-md transition duration-200 border-gray-300 hover:border-indigo-500 ml-40 mb-20" style={{ width: "100%", height:"100%"}}>
            
            <div className="e-card-content">
              <BackButton></BackButton>
              <p className="avatar-content">
                <b>Inquirer Name:</b> 
              </p>
              <p className="avatar-contenth">
                {props.inquiry.name}
              </p>
              <p className="avatar-content">
                <b>Type:</b> 
              </p>
              <p className="avatar-contenth">
                {props.inquiry.type}
              </p>
              <p className="avatar-content">
              <b>Subject:</b>
              </p>
              <p className="avatar-contenth">
                {props.inquiry.subject}
              </p>
              <p className="avatar-content">
              <b>Telephone:</b>
              </p>
              <p className="avatar-contenth">
                {props.inquiry.telephone}
              </p>
              <p className="avatar-content">
              <b>Description:</b>
              </p>
              <p className="avatar-contenth">
                {props.inquiry.description}
              </p>
              <p className="avatar-content">
              <b>Status:</b> 
              </p>
              <p className="avatar-contenth">
                {props.inquiry.status} 
              </p>
              <p className="avatar-content">
              <b>Reply:</b> 
              </p>
              <p className="avatar-contenth">
                {props.inquiry.reply} 
              </p>
              
            </div>
            <Link
                to={`/faq/update/`}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-full text-center"
              >  
              </Link>
          </div>
        </div>
        
      
    )
  );
};
export default ViewCard;
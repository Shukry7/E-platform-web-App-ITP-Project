import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <>
      <div class="min-h-screen h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container mx-auto">
          <div class="card" style={props.style}>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

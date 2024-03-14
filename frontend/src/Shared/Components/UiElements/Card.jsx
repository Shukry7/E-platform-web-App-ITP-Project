import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
      <div class="card" style={props.style}>
          {props.children}
        </div>
  );
};

export default Card;

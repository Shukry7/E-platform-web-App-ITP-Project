import React, { useEffect, useState } from "react";

const Dropdown = (props) => {
  const { initialValue } = props;
  const [value, setValue] = useState("");
  const [isValid, setisValid] = useState(false);

  const changeHandler = (event) => {
    console.log(event.target.value);
    if(event.target.value === "...."){
      setisValid(false)
    }else{
    setValue(event.target.value);
    setisValid(true)}
  };

  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <>
      <div
        className={`form-control `}
        style={{ display: "flex", alignItems: "center" }}
      >
        <label htmlFor={props.id}>{props.label}</label>&emsp;
        <select id={props.id} onChange={changeHandler}>
          {props.options.map((option) => {
            if (option.value === initialValue) {
              return <option selected >{option.value}</option>;
            } else {
              return <option>{option.value}</option>;
            }
          })}
        </select>
      </div>
    </>
  );
};

export default Dropdown;

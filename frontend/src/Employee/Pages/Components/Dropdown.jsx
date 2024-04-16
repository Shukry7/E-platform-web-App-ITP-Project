import React, { useState } from "react";

const Dropdown = ({ employee, date, onStatusChange }) => {
  const handleChange = (e) => {
    const selectedStatus = e.target.value;
    onStatusChange(employee, date, selectedStatus);
  };

  return (
    <select onChange={handleChange}>
      <option value="Absent">Absent</option>
      <option value="Present">Present</option>
    </select>
  );
};

export default Dropdown
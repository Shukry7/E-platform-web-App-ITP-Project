import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import Attendance from "./Components/attendance";
import Navbar from "../../Shared/Components/UiElements/Navbar";

const MarkAttendance = () => {
  return (
    <>
      <Navbar />

      <Card className="flex" style={{ width: "100%" }}>
        <div className="flex justify-between items-center"></div>
        <Attendance />
      </Card>
    </>
  );
};

export default MarkAttendance;

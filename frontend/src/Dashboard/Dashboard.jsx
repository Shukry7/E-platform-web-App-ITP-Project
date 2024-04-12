import React from "react";
import Navbar from "../Shared/Components/UiElements/Navbar";
import Header from "../Shared/Components/UiElements/header";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header/>
      </div>
    </>
  );
};

export default Dashboard;

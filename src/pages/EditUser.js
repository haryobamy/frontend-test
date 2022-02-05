import React from "react";
import EditAdd from "../components/EditAdd";

const EditUser = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 20px",
          alignItems: "baseline",
        }}
      >
        <h1>Dashboard</h1>
      </div>
      <EditAdd />
    </div>
  );
};

export default EditUser;

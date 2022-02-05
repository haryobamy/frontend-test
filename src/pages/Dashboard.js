import { Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserData from "../components/UserTable";
const Dashboard = () => {
  const { allusers } = useSelector((state) => state?.user);
  const [selectedFilter, setSelectedFilter] = useState("");

  const [filterTableData, setfilterTableData] = useState([]);

  useEffect(() => {
    switch (selectedFilter) {
      case "asc":
        return setfilterTableData(
          allusers.sort(
            (a, b) => b.username?.charCodeAt(0) - a.username?.charCodeAt(0)
          )
        );

      case "desc":
        return setfilterTableData(
          allusers.sort(
            (a, b) => a.username?.charCodeAt(0) - b.username?.charCodeAt(0)
          )
        );

      default:
        return setfilterTableData(allusers);
    }
  }, [selectedFilter]);

  function handleSort() {
    if (selectedFilter === "asc" && selectedFilter !== "") {
      setfilterTableData(
        allusers.sort(
          (a, b) => a.username?.charCodeAt(0) - b.username?.charCodeAt(0)
        )
      );
    } else {
      return setfilterTableData(
        allusers.sort(
          (a, b) => a.username?.charCodeAt(0) - b.username?.charCodeAt(0)
        )
      );
    }
  }

  console.log(selectedFilter);

  return (
    <div className="table_container">
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 20px",
          alignItems: "center",
        }}
      >
        <p>User list</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ marginRight: 3 }}>
            {" "}
            Sort
          </Typography>
          <Select
            sx={{
              width: 100,
            }}
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <MenuItem value="" disabled>
              Filter
            </MenuItem>
            <MenuItem value={"asc"}>A-Z</MenuItem>
            <MenuItem value={"desc"}>Z-A</MenuItem>
          </Select>
        </div>

        <Button variant="contained" sx={{ height: 50 }} href={"/edituser"}>
          Add User
        </Button>
      </div>

      <UserData filterTableData={filterTableData} />
    </div>
  );
};

export default Dashboard;

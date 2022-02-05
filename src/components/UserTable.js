import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const UserTable = (props) => {
  const { filterTableData } = props;
  const users = useSelector((state) => state?.user);
  const { allusers } = users;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleClose() {
    setIsOpen(false);
  }
  function handleOpen(user) {
    setIsOpen(true);
    setUser(user);
  }

  function handleDelete(id) {
    dispatch(deleteUser(id));
    setIsOpen(false);
  }

  return (
    <Box sx={{ width: "100%", background: "whitesmoke" }}>
      {filterTableData.length > 0 ? (
        <Table>
          <TableHead sx={{ background: "gray" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterTableData.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user?.id}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.username}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.address?.city}</TableCell>
                <TableCell>
                  <Button
                    sx={{ background: "#f0ad4e", color: "#ffffff" }}
                    onClick={() =>
                      navigate("/edituser", {
                        state: { user },
                        replace: false,
                      })
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  {" "}
                  <Button
                    sx={{ background: "#d0312d", color: "#fff" }}
                    onClick={() => handleOpen(user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: "auto",
            width: "100%",
          }}
        >
          <p>No User Found</p>
        </div>
      )}
      <Dialog maxWidth="lg" onClose={handleClose} open={isOpen}>
        <div
          style={{
            width: 400,
            height: 150,
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            {/* <MdVerifiedUser size={150} color={"green"} /> */}
            <Typography variant="h5" style={{ color: "red" }}>
              Are Sure You Want To Delete
            </Typography>
            <Typography variant="h6" style={{ marginBottom: 20 }} className="">
              {user?.name}
            </Typography>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              sx={{ marginRight: 3, border: "1px solid" }}
            >
              cancel
            </Button>
            <Button
              onClick={() => handleDelete(user?.id)}
              sx={{ marginRight: 3, border: "1px solid red", color: "red" }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </Box>
  );
};

export default UserTable;

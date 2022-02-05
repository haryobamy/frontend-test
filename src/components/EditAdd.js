import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../main.css";
import {
  addUser,
  emptyFields,
  handleEditState,
  updateUser,
} from "../redux/actions/userAction";
import produce from "immer";
import { useNavigate, useLocation } from "react-router-dom";

const EditAdd = () => {
  const { address, id, username, name, email } = useSelector(
    (state) => state?.user
  );
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.user;

  const [validationFired, setValidationFired] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData?.id) {
      setIsEdit(true);
      dispatch(handleEditState("id", editData?.id));
      dispatch(handleEditState("name", editData?.name));
      dispatch(handleEditState("email", editData?.email));
      dispatch(handleEditState("username", editData?.username));
      handleLevel1Data(editData?.address?.city, "city");
    }
  }, []);

  const handleChange = (name, value) => {
    // const { name, value } = e.target;
    dispatch(handleEditState(name, value));
  };

  function handleLevel1Data(value, type) {
    handleChange(
      "address",
      produce(address, (draft) => {
        draft[type] = value;
      })
    );
  }
  useEffect(() => {
    if (validationFired) {
      validate();
    }
  }, [validationFired, id, username, address?.city, name, email]);
  function validate() {
    setValidationFired(true);
    let validated = true;
    const localErrors = {};
    const fieldsToValidate = {
      Name: name,
      username: username,
      city: address?.city,
      email: email,
    };

    Object.keys(fieldsToValidate)?.forEach((field, index) => {
      if (fieldsToValidate[field] === "") {
        validated = false;
        localErrors[field] = `${field} is Required!`;
      }
    });
    setErrors(localErrors);
    return validated;
  }

  function handleSubmit() {
    let validated = validate();
    if (validated) {
      if (isEdit) {
        dispatch(
          updateUser({
            id: id,
            name: name,
            username: username,
            email: email,
            city: address?.city,
          })
        );
        dispatch(emptyFields());
        setIsEdit(false);
        navigate("/");
      } else {
        dispatch(
          addUser({
            id: Math.round(Math.random() * 100 + 10),
            name: name,
            username: username,
            email: email,
            city: address?.city,
          })
        );
        dispatch(emptyFields());
        navigate("/");
      }
    }
  }

  return (
    <div className="editcontainer">
      <form style={{ paddingBottom: 10 }}>
        <p>Form</p>
        <div className="inputContainer">
          <Typography variant="body1" sx={{ marginRight: 10, width: 150 }}>
            Name
          </Typography>
          <TextField
            fullWidth
            type={"text"}
            name="name"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors?.Name}
            helperText={errors?.Name}
          />
        </div>
        <div className="inputContainer">
          <Typography variant="body1" sx={{ marginRight: 10, width: 150 }}>
            Email
          </Typography>
          <TextField
            fullWidth
            type={"email"}
            name="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            helperText={errors?.email}
            error={errors?.email}
          />
        </div>
        <div className="inputContainer">
          <Typography variant="body1" sx={{ marginRight: 10, width: 150 }}>
            Username
          </Typography>
          <TextField
            fullWidth
            type={"text"}
            name="username"
            value={username}
            onChange={(e) => handleChange("username", e.target.value)}
            helperText={errors?.username}
            error={errors?.username}
          />
        </div>
        <div className="inputContainer">
          <Typography variant="body1" sx={{ marginRight: 10, width: 150 }}>
            City
          </Typography>
          <TextField
            fullWidth
            type={"text"}
            name="city"
            value={address?.city}
            onChange={(e) => handleLevel1Data(e.target.value, "city")}
            helperText={errors?.city}
            error={errors?.city}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 40,
            marginBottom: 30,
          }}
        >
          <Button
            sx={{
              background: "white",
              marginRight: 2,
              color: "red",
              border: "1px solid red",
            }}
            onClick={() => {
              dispatch(emptyFields());
              navigate("/");
            }}
          >
            Cancle
          </Button>
          <Button sx={{ background: "lightgreen" }} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAdd;

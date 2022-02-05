import React, { Fragment, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

import { Detector } from "react-detect-offline";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/actions/userAction";

const ApiProvider = (props) => {
  const dispatch = useDispatch();
  const { addToast, removeToast } = useToasts();

  const getUser = async () => {
    try {
      await fetch(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          dispatch(getAllUser([...result]));
        });
      //   if (response) {
      //     dispatch(getAllEmployees({ ...response }));
      //   }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Fragment>
      {props.children}
      <Detector
        onChange={(online) => {
          if (online) {
            removeToast("networkStop", () => {
              addToast("Stable Internet Connection is Back!", {
                autoDismiss: true,
                appearance: "info",
              });
            });
          } else {
            addToast("Please check your Internet Connection!", {
              autoDismiss: false,
              appearance: "error",
              id: "networkStop",
            });
          }
        }}
        render={({ online }) => {
          return null;
        }}
      >
        13
      </Detector>
    </Fragment>
  );
};

export default ApiProvider;

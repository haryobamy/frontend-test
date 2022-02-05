import { ActionTypes } from "../actionTypes";

export const emptyFields = () => ({
  type: ActionTypes.EMPTYFIELDS,
});

export const handleEditState = (name, value) => ({
  type: ActionTypes.HANDLE_USER_DATA,
  payload: {
    name,
    value,
  },
});

export const getAllUser = (value) => ({
  type: ActionTypes.GET_ALL_USERS,
  payload: value,
});

export const setIsEdit = (value) => ({
  type: ActionTypes.SET_EDIT,
  payload: value,
});
export const setOpenEditUser = (value) => ({
  type: ActionTypes.SET_EDIT_USER,
  payload: value,
});
export const deleteUser = (value) => ({
  type: ActionTypes.DELETE_USER,
  payload: value,
});
export const addUser = (value) => ({
  type: ActionTypes.ADD_USERS,
  payload: value,
});
export const updateUser = (value) => ({
  type: ActionTypes.UPDATE_USER,
  payload: value,
});

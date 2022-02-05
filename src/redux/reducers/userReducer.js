import { ActionTypes } from "../actionTypes";

const emptyState = {
  id: 1,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
};

const initialState = {
  ...emptyState,
  allusers: [],
  modal: false,
  isEdit: false,
  selectedUser: [],
  errors: {},
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ALL_USERS:
      return {
        ...state,
        allusers: payload,
      };
    case ActionTypes.ADD_USERS:
      const { id, name, username, email, city } = payload;
      return {
        ...state,
        allusers: [
          ...state?.allusers,
          {
            id: id,
            name: name,
            username: username,
            email: email,
            address: {
              street: "",
              suite: "",
              city: city,
              zipcode: "",
              geo: {
                lat: "",
                lng: "",
              },
            },
            phone: "",
            website: "",
          },
        ],
      };

    case ActionTypes.EMPTYFIELDS:
      return {
        ...state,
        ...emptyState,
      };
    case ActionTypes.HANDLE_USER_DATA:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case ActionTypes.DELETE_USER:
      const { allusers } = state;
      const newUser = allusers.filter((user) => user?.id !== payload);
      return {
        ...state,
        allusers: newUser,
      };
    case ActionTypes.UPDATE_USER:
      console.log(payload, "from update");

      const updatedUser = state.allusers.map((user) => {
        if (user?.id === payload?.id) {
          return {
            ...user,
            id: payload?.id,
            name: payload?.name,
            username: payload?.username,
            email: payload?.email,
            address: {
              street: "",
              suite: "",
              city: payload?.city,
              zipcode: "",
              geo: {
                lat: "",
                lng: "",
              },
            },
            phone: "",
            website: "",
          };
        }
        return user;
      });
      console.log(updatedUser);
      return {
        ...state,
        allusers: updatedUser,
      };

    default: {
      return state;
    }
  }
};

export default userReducer;

// const initialState = {
// isValidationFiredSignin: false,
// isValidationFiredSignup: false,
//   loggedIn: true,
//   user: {
//     first_name: "Badmus",
//     last_name: "Ayobami",
//     email: "haryobamy.badmus@gmail.com",
//     userType: "",

//     role: "ADMIN", // ['GUEST', 'USER', 'ADMIN']
//   },
// };

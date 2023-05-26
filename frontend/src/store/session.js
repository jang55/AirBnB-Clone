import { csrfFetch } from "./csrf";


/*************** TYPES **************************/
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";


/*************** ACTIONS CREATOR **************************/
const setUserAction = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUserAction = () => {
  return {
    type: REMOVE_USER,
  };
};


/*************** THUNK ACTIONS CREATOR **************************/
export const loginThunk = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUserAction(data.user));
  return response;
};




/************* REDUCER **********************/
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
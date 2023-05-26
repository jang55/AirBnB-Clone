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

/******/

const removeUserAction = () => {
  return {
    type: REMOVE_USER,
  };
};


/*************** THUNK ACTIONS CREATOR **************************/
//login to a user
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

/******/

//get the current user
export const restoreUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/currentUser");
  const data = await response.json();
  dispatch(setUserAction(data.user));
  return response;
};

/******/

//signup a user
export const signupThunk = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUserAction(data.user));
  return response;
};

/******/

//signout user
export const logoutThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUserAction());
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
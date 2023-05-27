/********************** TYPES ******************************/
const LOAD_ALL_SPOTS = "spots/loadAllSpots";
const LOAD_ONE_SPOT = "spots/loadOneSpot"
const ADD_SPOT = "spots/addSpot";
const UPDATE_SPOT = "spots/updateSpot";
const REMOVE_SPOT = "spots/removeSpot";

/********************** ACTION CREATORS ***************************/
const loadAllSpotsAction = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    payload: spots,
  };
};

/******/

const loadOneSpotsAction = (spot) => {
  return {
    type: LOAD_ONE_SPOT,
    payload: spot,
  };
};

/******/

const addOneSpotAction = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

/******/

const updateOneSpotAction = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

/******/

const removeOneSpotAction = (spotId) => {
  return {
    type: REMOVE_SPOT,
    payload: spotId,
  };
};

/******/

/********************* THUNK ACTION CREATORS ********************/
//gets all the spots
export const loadSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/locations");

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadAllSpotsAction(spots));
    return spots;
  }
};

/******/

//get one spot by id
export const loadOneSpotThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/locations/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadOneSpotsAction(spot));
    return spot;
  }
};

/******/

//creates a new spot
export const addSpotThunk = (newSpot) => async (dispatch) => {
  const res = await fetch("/api/locations", {
    method: "POST",
    headers: {
      "Content-Type": "applicaton/json",
    },
    body: JSON.stringify(newSpot),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(addOneSpotAction(spot));
    return spot;
  }
};

/******/

//updates an existing spot
export const updateSpotThunk = (updatedSpot, spotId) => async (dispatch) => {
  const res = await fetch(`/api/locations/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "applicaton/json",
    },
    body: JSON.stringify(updatedSpot),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(updateOneSpotAction(spot));
    return spot;
  }
};

/******/

//deletes a spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/locations/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeOneSpotAction(spotId));
  }
};

/********************** REDUCERS *****************************/
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD_ALL_SPOTS:
        newState = {...state};
        const allSpots = action.payload.Spots;
        allSpots.forEach(spot => {
            newState[spot.id] = spot;
        })
        return newState;
    case LOAD_ONE_SPOT:
        newState = {};
        newState[action.payload.id] = action.payload;
        return newState;
    case ADD_SPOT:
        newState = {...state};
        newState[action.payload.id] = action.payload;
        return newState;
    case UPDATE_SPOT:
        newState = {...state};
        newState[action.payload.id] = action.payload;
        return newState;
    case REMOVE_SPOT:
        newState = {...state};
        delete newState[action.payload];
        return newState;
    default:
        return state;
  }
};

// window.store.dispatch(window.spotsActions.loadSpotsThunk());
// window.store.dispatch(window.spotsActions.loadOneSpotThunk(1));
// window.store.dispatch(window.spotsActions.addSpotThunk({
//     ownerId: 1,                                     
//     address: "123 thatWay Ln",
//     city: "SomePlace",
//     state: "CA",
//     country: "USA",
//     lat: 10.34242,
//     lng: -104.2342,
//     name: "Amazing camping spot",
//     description: "This is a really short description",
//     price: 1000000
//   }));
// window.store.dispatch(window.spotsActions.deleteSpotThunk(10));

export default spotsReducer;

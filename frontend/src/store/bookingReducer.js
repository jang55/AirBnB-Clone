import { csrfFetch } from "./csrf";


/*************** TYPES **************************/
const LOAD_USER_BOOKINGS = "bookings/userBookings"
const LOAD_SPOTS_BOOKINGS = "bookings/spotBookings"
const ADD_BOOKING = "bookings/addBooking"
const UPDATE_BOOKING = "bookings/updateBooking"
const REMOVE_BOOKING = "bookings/removeBooking"


/*************** ACTIONS CREATOR **************************/
export const loadUserBookingsAction = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        payload: bookings
    };
};

/******/

export const loadSpotsBookingsAction = (bookings) => {
    return {
        type: LOAD_SPOTS_BOOKINGS,
        payload: bookings
    }
};

/******/

export const addBookingAction = (booking) => {
    return {
        type: ADD_BOOKING,
        payload: booking
    }
};

/******/

export const updateBookingAction = (booking) => {
    return {
        type: UPDATE_BOOKING,
        payload: booking
    }
};

/******/

export const removeBookingAction = (bookingId) => {
    return {
        type: REMOVE_BOOKING,
        payload: bookingId
    }
};



/*************** THUNK ACTIONS CREATOR **************************/
//loads all users bookings
export const loadUserBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users/currentUser/bookings`);

    if(res.ok) {
        const bookings = await res.json();
        dispatch(loadUserBookingsAction(bookings));
        return bookings;
    }
}

/******/

//loads all bookings by spot id
export const loadSpotsBookingsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/locations/${spotId}/bookings`);

    if(res.ok) {
        const bookings = await res.json();
        dispatch(loadSpotsBookingsAction(bookings));
        return bookings;
    }
}

/******/

//creates a new booking
export const createBookingThunk = (booking, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/locations/${spotId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
    });

    if(res.ok) {
        const booking = await res.json();
        dispatch(loadUserBookingsThunk());
        return booking;
    }
}

/******/

//updates a current booking
export const updateBookingThunk = (booking, bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
    });

    if(res.ok) {
        const booking = await res.json();
        dispatch(loadUserBookingsThunk());
        return booking;
    }
}

/******/

//deletes a booking
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    });

    if(res.ok) {
        dispatch(removeBookingAction(bookingId));
    }
}


/************* REDUCER **********************/
const initialState = {};

const bookingReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case LOAD_USER_BOOKINGS:
            newState = {};
            const allUserBookings = action.payload.Bookings;
            allUserBookings.forEach(booking => {
                newState[booking.id] = booking;
            })
            return newState;
        case LOAD_SPOTS_BOOKINGS:
            //need to work on logic between if user is owner or not
            newState = {};
            // const allSpotsBookings = action.payload.Bookings;
            // allSpotsBookings.forEach(booking => {
            //     newState[booking.id] = booking;
            // })
            return newState;
        case ADD_BOOKING:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case UPDATE_BOOKING:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case REMOVE_BOOKING:
            newState = {...state};
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default bookingReducer


//window.store.dispatch(window.bookingActions.loadUserBookingsThunk());
//window.store.dispatch(window.bookingActions.loadSpotsBookingsThunk(1));

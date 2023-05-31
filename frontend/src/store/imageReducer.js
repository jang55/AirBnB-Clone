import { csrfFetch } from "./csrf";



/*************** TYPES **************************/
const ADD_SPOT_IMAGE = "images/addImage"


/*************** ACTIONS CREATOR **************************/
export const addSpotImageAction = (image) => {
    return {
        type: ADD_SPOT_IMAGE,
        payload: image
    }
};

// export const  = () => {
//     return {
//         type: ,
//         payload:
//     }
// };

// export const  = () => {
//     return {
//         type: ,
//         payload:
//     }
// };

// export const  = () => {
//     return {
//         type: ,
//         payload:
//     }
// };



/*************** THUNK ACTIONS CREATOR **************************/

export const addSpotImageThunk = (image, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/locations/${spotId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    });

    if(res.ok) {
        const image = await res.json();
        dispatch(addSpotImageAction(image));
        return image;
    }

}


/************* REDUCER **********************/
const initialState = {};

const imageReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case ADD_SPOT_IMAGE:
            newState = {};
            newState[action.payload.id] = action.payload
            return newState;
        // case :

        //     return newState;
        // case :

        //     return newState;
        // case :

        //     return newState;
        default:
            return state;
    }
}

export default imageReducer


// window.store.dispatch(window.imageActions.addSpotImageThunk({ "url": imgURL, "preview": true }, 9));
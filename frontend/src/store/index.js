import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spotsReducer';
import bookingReducer from './bookingReducer';
import reviewReducer from "./reviewReducer"
import imageReducer from './imageReducer';

//all reducers combined into one
const rootReducer = combineReducers({
  sessionState: sessionReducer,
  spotsState: spotsReducer,
  bookingState: bookingReducer,
  reviewState: reviewReducer,
  imageState: imageReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;
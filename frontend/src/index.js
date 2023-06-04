import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import configureStore from "./store";
import ReviewProvider from "./context/ReviewContext";
import { ModalProvider } from "./context/Modal";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import * as spotsActions from "./store/spotsReducer";
import * as bookingActions from "./store/bookingReducer";
import * as reviewActions from "./store/reviewReducer";
import * as imageActions from "./store/imageReducer";

//store imports above this line
/************************************************/

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotsActions = spotsActions;
  window.bookingActions = bookingActions;
  window.reviewActions = reviewActions;
  window.imageActions = imageActions;
}

const Root = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <ReviewProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReviewProvider>
      </ModalProvider>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

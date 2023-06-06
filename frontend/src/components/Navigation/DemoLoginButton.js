import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

function DemoLoginButton() {
  const dispatch = useDispatch();

  const demoHandler = (e) => {
    e.preventDefault();

    //dispatch the thunk to make a request to login
    return dispatch(sessionActions.loginThunk({
        credential: "Demo-lition",
        password: "password"
    }));
  };

  // return <button onClick={demoHandler}>Demo-User Login</button>;
  return <button className="demo-button" onClick={demoHandler}>Log in as Demo User</button>;
}

export default DemoLoginButton;

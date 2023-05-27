import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

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

  return <button onClick={demoHandler}>Demo-User Login</button>;
}

export default DemoLoginButton;

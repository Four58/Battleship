import React, { useState, Fragment } from "react";
import Modal from "./ui/Modal";
import classes from "./LoginMenu.module.css";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { logActions } from "../store/logSlice";

const LoginMenu = () => {
  // const username = useRef();

  const notEmpty = (item) => item.trim() !== "";

  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();

  const {
    value: userNameValue,
    valid: userNameValid,
    touchInvalid: userNameTouchInvalid,
    onChangeHandler: userNameChangeHandler,
    onBlurHandler: userNameBlurHandler,
  } = useInput(notEmpty);

  const onClickName = (event) => {
    event.preventDefault();
    userNameBlurHandler();
    if (userNameValid) {
      setOk((prev) => !prev);
    }
  };

  const submitUsernameHandler = (event) => {
    event.preventDefault();
    if (!userNameValid) {
      return;
    }
    console.log(userNameValue);
    dispatch(logActions.onLogin({ username: userNameValue }));
  };

  const nameClasses = `${classes.control} ${
    userNameTouchInvalid ? classes.invalid : ""
  }`;

  const content = (
    <Fragment>
      <h1>Welcome to Battleship!</h1>
      <div className={classes.actions}>
        <div className={nameClasses}>
          <label>Username: </label>
          <input
            value={userNameValue}
            onChange={userNameChangeHandler}
            onBlur={userNameBlurHandler}
          />
        </div>
        <button type="submit" className={classes.button} onClick={onClickName}>
          Enter
        </button>
      </div>
    </Fragment>
  );

  const waiting = (
    <div>
      <h2>Enjoy! {userNameValue}</h2>
      <div className={classes.actions}>
        <button type="button" onClick={onClickName} className={classes.button}>
          Back
        </button>
        <button
          type="submit"
          onClick={submitUsernameHandler}
          className={classes.submit}
        >
          Ok!
        </button>
      </div>
    </div>
  );

  return (
    <Modal>
      <div className={classes.form}>
        <form>
          {!ok && content}
          {ok && waiting}
        </form>
      </div>
    </Modal>
  );
};

export default LoginMenu;

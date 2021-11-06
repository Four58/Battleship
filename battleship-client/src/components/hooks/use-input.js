import { useReducer } from "react";

const funcReducer = (state, action) => {
  if (action.type === "change") {
    return { value: action.value, touched: true };
  }
  if (action.type === "blur") {
    return { value: state.value, touched: true };
  }
  if (action.type === "reset") {
    return { value: action.value, touched: false };
  }
  return funcReducer;
};

const initReducer = {
  value: "",
  touched: false,
};

const useInput = (check) => {
  const [userInput, setUserInput] = useReducer(funcReducer, initReducer);
  const isValid = check(userInput.value);
  const inputInvalid = !isValid && userInput.touched;

  const onChangeHandler = (event) => {
    setUserInput({ type: "change", value: event.target.value });
  };

  const onBlurHandler = () => {
    setUserInput({ type: "blur" });
  };

  const reset = () => {
    setUserInput({ type: "reset", value: "" });
  };

  return {
    value: userInput.value,
    valid: isValid,
    touchInvalid: inputInvalid,
    onChangeHandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;

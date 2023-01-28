import { useState } from "react";
import { login, logout } from "../store";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [userName, handleUserName] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <div>
      <h1>This is Login Page</h1>
      <input
        type="text"
        onChange={(event) => {
          handleUserName(event.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          dispatch(login({ username: userName }));
        }}
      >
        Submit Login
      </button>
      <button>Logout</button>
    </div>
  );
};

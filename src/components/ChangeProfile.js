import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export const ChangeProfile = (props) => {
  const {setUserName} = useContext(AppContext);
  const [newUserName, setNewUserName] = useState('');

  return(
    <div>
      <input onChange={(event) => {
        setNewUserName(event.target.value);
      }}/>
      <button onClick={() => {
        setUserName(newUserName);
      }}>Change User Name</button>
    </div>
  );
};
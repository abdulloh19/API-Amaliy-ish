import React, { useEffect, useState } from "react";
import { dooGet } from "./servise";

const SelectUser = ({ onChangeUser, name }) => {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrenUser] = useState("");

  async function getUser() {
    const users = await dooGet("/users");
    setUser(users);
  }

  function onChengeSelect(event) {
    const id = event.target.value;
    const id1 = id === "" ? "" : parseInt(id);
    setCurrenUser(id1);
    if (onChangeUser) onChangeUser(id1);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <select
      name={name}
      className="form-control"
      value={currentUser}
      onChange={onChengeSelect}
    >
      {user.map((item) => (
        <option value={item.id} key={item.id}>
          {item.id}. {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectUser;

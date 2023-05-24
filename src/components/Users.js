import React, { useEffect, useState } from "react";
import { dooGet } from "./servise";
const Users = () => {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await dooGet("/users");
    setUsers(res);
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="col-md-10 offset-1">
      <h1 className="text-center mt-3">Users</h1>
      <table className="table table-striped mt- table-dark border">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Web Site</th>
            <th>Adress</th>
            <th>Compony</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.website}</td>
              <td>{item.address.city}</td>
              <td>{item.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

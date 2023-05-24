import React, { useEffect, useId, useState } from "react";
import { dooGet } from "./servise";
import Todo from "../todo/Todo";

const Todos = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentUser, setCurrenUser] = useState("");
  const [pages, setPages] = useState(1);

  function filter(userId, completed, pages) {
    return data
      .filter(
        (item, index) =>
          ((item.userId == userId || !userId) &&
            item.completed === completed) ||
          !filtering
      )
      .filter((item, index) => index >= (pages - 1) * 10 && index < pages * 10);
  }

  async function getTodos() {
    const res = await dooGet("/todos");
    setTodos(res.filter((item, index) => index >= 0 && index < 10));
    setData(res);
  }
  async function getUsers() {
    const res = await dooGet("/users");
    setUsers(res);
  }

  function onChangeSelect(event) {
    const userId = event.target.value;

    const res = filter(userId, completed, pages);
    setTodos(res);
    setCurrenUser(userId);
  }

  function onPrev() {
    setPages((prev) => prev - 1);
    
  }
  function onNext() {
    setPages((prev) => prev + 1);
  }

  useEffect(() => {
    getTodos();
    getUsers();
  }, []);

  useEffect(() => {
    const res = filter(currentUser, completed, pages);
    setTodos(res);
  }, [pages]);

  function completedCheck(event) {
    const checked = event.target.checked;
    const res = filter(currentUser, checked, pages);
    setCompleted(checked);
    setTodos(res);
    setFiltering(true);
  }

  function reset() {
    setTodos(todos);
    setCurrenUser("");
    setCompleted(false);
    setFiltering(false);
    setPages(1)
  }

  return (
    <div className="row offset-1">
      <div className="col-md-1">
        <button className="btn btn-danger my-3" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="col-md-3">
        <select
          className="form-control mt-3 option"
          value={currentUser ? parseInt(currentUser) : ""}
          onChange={onChangeSelect}
        >
          <option value="" className="option">
            All
          </option>
          {users.map((item) => (
            <option value={item.id} key={item.id}>
              {item.id}. {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2 my-3">
        <label style={{ fontSize: "25px" }}>
          Complated:{" "}
          <input
            checked={completed}
            onChange={completedCheck}
            type="checkbox"
            style={{ transform: "scale(2)" }}
            className="mx-2"
          />
        </label>
      </div>
      <h1 className="text-center">Todos</h1>
      {todos.map((item, index) => (
        <Todo key={index} item={item} />
      ))}

      <div className="row my-4 offset-1">
        <div className="col-md-1">
          <button className="btn btn-dark" onClick={onPrev}>
            {"<< "}prev
          </button>
        </div>
        <div className="col-md-1">
          <h2 className="text-center">{pages}</h2>
        </div>
        <div className="col-md-1">
          <button className="btn btn-dark" onClick={onNext}>
            next {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todos;

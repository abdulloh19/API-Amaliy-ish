import React from "react";

const Todo = ({ item }) => {
  const style = {
    transform: "scale(2)",
  };
  return (
    <>
      <div className="row">
        <div className="col-md-1 my-2 d-flex justify-content-between">
          <div style={{ fontSize: "35px" }}>{item.id} </div>
          <input
            style={style}
            id={"checkbox/" + item.id}
            type="checkbox"
            checked={item.completed}
            className="mx-3"
          />
        </div>
        <div className="col-md-5 my-2">
          <h3 style={{ textAlign: "left", fontSize: "30px" }}>
            <label htmlFor={"checkbox/" + item.id}>{item.title}</label>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Todo;

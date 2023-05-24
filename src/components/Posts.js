import React, { useEffect, useState } from "react";
import { dooGet } from "./servise";

const Posts = ({ history }) => {
  const filter = (userId) => {
    return data.filter((item) => item.userId == userId || userId == "");
  };

  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);

  async function getPosts() {
    const res = await dooGet("/posts");
    setPost(res);
    setData(res);
  }

  async function getUser() {
    const user = await dooGet("/users");
    setUser(user);
  }

  useEffect(() => {
    getPosts();
    getUser();
  }, []);

  const openOnePost = (id) => {
    history.push("/posts/" + id);
  };

  function onChangeSelect(event) {
    const userId = event.target.value;

    const res = filter(userId);
    setPost(res);
  }

  return (
    <div>
      <h1 className="text-center">Posts</h1>
      <div className="row my-4 offset-1">
        <div className="col-md-3">
          <select onChange={onChangeSelect} className="form-control">
            <option value={""}>All</option>
            {user.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-5 col-md-10 offset-1">
        {post.map((item, index) => (
          <div key={index} className="col-md-3 mt-3">
            <div
              className="card my-2 prost-card"
              style={{ height: "300px" }}
              onClick={() => openOnePost(item.id)}
            >
              <div style={{ fontSize: "35px" }}>{item.id}</div>
              <div className="card_header bg-dark text-light">{item.title}</div>
              <div className="card-body">{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

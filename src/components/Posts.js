import React, { useEffect, useState } from "react";
import SelectUser from "./SelectUser";
import PostModal from "./PostModal";
import { dooGet, doPost } from "./servise";

const Posts = ({ history }) => {
  const filter = (userId) => {
    return data.filter((item) => item.userId == userId || userId == "");
  };

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function getPosts() {
    const res = await dooGet("/posts");
    setPost(res);
    setData(res);
  }

  useEffect(() => {
    getPosts();
    getUser();
  }, []);

  const openOnePost = (id) => {
    history.push("/posts/" + id);
  };

  async function getUser() {
    const users = await dooGet("/users");
    setUser(users);
  }

  function onChangeUser(userId) {
    const res = filter(userId);
    setPost(res);
  }

  async function savePost(data) {
    const res = await doPost("/posts", data);
    console.log(res);
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }
  function onSubmit(data) {
    data.user = user;
    setModalVisible(false);
    savePost(data);
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-center">Posts</h1>

      <button className="float-end btn btn-dark mx-5" onClick={toggleModal}>
        Add
      </button>
      <div className="row my-4 offset-1">
        <div className="col-md-3">
          <SelectUser onChangeUser={onChangeUser} />
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
      <PostModal
        isOpen={modalVisible}
        toggle={toggleModal}
        save={onSubmit}
        onChangeUser={onChangeUser}
      />
    </div>
  );
};

export default Posts;

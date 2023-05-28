import React, { useEffect, useState } from "react";
import SelectUser from "./SelectUser";
import PostModal from "./PostModal";
import { dooGet, doPost } from "./servise";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = ({ history }) => {
  const filter = (userId) => {
    return data.filter((item) => item.userId == userId || userId == "");
  };

  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function getPosts() {
    const res = await dooGet("/posts");
    setPost(res);
    setData(res);
  }

  useEffect(() => {
    getPosts();
  }, []);

  const openOnePost = (id) => {
    history.push("/posts/" + id);
  };

  function onChangeUser(userId) {
    const res = filter(userId);
    setPost(res);
  }

  async function savePost(data) {
    const res = await doPost("/posts", data);
    setData((prev) => {
      prev.unshift(res);
      setPost([...prev]);
      console.log(prev);
      return prev;
    });
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }
  function onSubmit(data) {
    setModalVisible(false);
    toast.success("added users");
    savePost(data);
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-center">Posts</h1>
      <ToastContainer />
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

import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState, useEffect } from "react";
import { dooGet } from "./servise";
import { useForm } from "react-hook-form";

const PostModal = ({ toggle, save, isOpen }) => {
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
  }

  useEffect(() => {
    getUser();
  }, []);

  const { register, handleSubmit } = useForm();

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Add Post</ModalHeader>
      <ModalBody>
        <form id="form" onSubmit={handleSubmit(save)}>
          <input
            {...register("title")}
            type="text"
            className="form-control my-2"
            placeholder="Title"
            name="title"
          />
          <select
            {...register("user")}
            name={"user"}
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
          <textarea
            {...register("body")}
            placeholder="Body..."
            className="form-control my-2"
            name="body"
            id=""
            cols="10"
            rows="10"
          ></textarea>
        </form>
      </ModalBody>
      <ModalFooter>
        <button type="submit" form="form" className="btn btn-success">
          Save
        </button>
        <button className="btn btn-danger" onClick={toggle}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default PostModal;

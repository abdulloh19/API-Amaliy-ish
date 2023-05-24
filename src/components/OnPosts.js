import React, { useEffect, useState } from "react";
import { dooGet } from "./servise";

const OnPosts = ({ match, history, location }) => {
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    getOnePosts(match.params.id);
  });

  async function getOnePosts(id) {
    const onePost = await dooGet("/posts/" + id);
    setPost(onePost);
    const postUser = await dooGet("/users/" + onePost.userId);
    setUser(postUser);
  }

  return (
    <div className="row my-4">
      <div className="col-md-3">
        <div className="card">
          <div className="card-header">{user.id + ". " + user.name}</div>
          <div className="card-body">{user.phone}</div>
        </div>
      </div>
      <div className="col-md-8 offset-1">
        <div className="card">
          <div className="card-header">{post.id + "." + post.title}</div>
          <div className="card-body">{post.body}</div>
        </div>
      </div>
    </div>
  );
};

export default OnPosts;

import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Posts from "./components/Posts";
import Users from "./components/Users";
import Todos from "./components/Todos";
import OnPosts from "./components/OnPosts";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Json Placeholder</h1>
      <Link to={"/posts"} className="btn btn-dark">
        Post
      </Link>
      <Link to={"/todos"} className="btn btn-dark mx-2">
        Todo
      </Link>
      <Link to={"/users"} className="btn btn-dark ">
        Users
      </Link>

      <Switch>
        <Route path="/posts/:id" component={OnPosts} />
        <Route path="/posts" component={Posts} />
        <Route path="/users" component={Users} />
        <Route path="/todos" component={Todos} />
      </Switch>
    </div>
  );
}

export default App;

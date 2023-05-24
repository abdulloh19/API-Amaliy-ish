import axios from "axios";

export function dooGet(url) {
  return axios.get("https://jsonplaceholder.typicode.com"+url).then((res) => {
    return res.data;
  });
}

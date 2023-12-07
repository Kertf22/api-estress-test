import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = "http://localhost:3000";

// const login = () => {
//   const data = { username: "username", password: "password" };
//   let res = http.post(`${BASE_URL}/login`, JSON.stringify(data));

//   check(res, { "success login": (r) => r.status === 200 });

//   sleep(0.3);
// };

const create = () => {
  const time = Math.random() * 100
  const data = {
    name: "name " + time,
    username: "username " + time,
    password: "password " + time,
  };
  let headers = { "Content-Type": "application/json" };

  let res = http.post(`${BASE_URL}/create`, JSON.stringify(data), {
    headers: headers,
  });
  check(res, { "success create": (r) => r.status === 200 });

  sleep(0.1);
};

export default function () {
  create();
}

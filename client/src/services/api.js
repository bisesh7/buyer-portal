import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log(token);

    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

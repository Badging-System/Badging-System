// utils/API.js

import axios from "axios";

export default axios.create({
  baseURL: process.env.HOST,
  responseType: "json"
});

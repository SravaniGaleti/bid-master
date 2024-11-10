import axios from "axios";

export const baseURL = "http://localhost:5000/api/";
export const imageURL = "http://localhost:5000";
const axiosapi = axios.create({
  baseURL,
});
export default axiosapi;

import axios from "axios";

export const baseURL = "http://192.168.1.85:5000/api/";
export const imageURL = "http://192.168.1.85:5000";
const axiosapi = axios.create({
  baseURL,
});
export default axiosapi;

import axios from "axios";
import { getAuthHeader } from "./authHeader";
import { API_URL } from "../../api/config";

const API = axios.create({
  baseURL: API_URL,
});

export const authenticate = async () => {
  try {
    const response = await API.get("/login/authorize", getAuthHeader());
    console.log(response.status);
    return Promise.resolve(response.status);
  } catch (error) {
    console.log("Authentication failed:", error.response.status);
    return Promise.resolve(error.response.status);
  }
};

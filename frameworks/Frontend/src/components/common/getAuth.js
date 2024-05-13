import axios from "axios";
import { getAuthHeader } from "./authHeader";
import { API_URL } from "../../api/config";

const API = axios.create({
  baseURL: API_URL,
});

export const authenticate = async () => {
  try {
    const response = await API.get("/login/authorize", getAuthHeader());
    return req.status();
  } catch (error) {
    console.error("Authentication failed:", error);
    return error.status;
  }
};

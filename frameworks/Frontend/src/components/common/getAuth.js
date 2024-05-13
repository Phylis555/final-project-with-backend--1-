import axios from "axios";
import { getAuthHeader } from "./authHeader";
import { API_URL } from "../../api/config";

const API = axios.create({
  baseURL: API_URL,
});

export const authenticate = async () => {
  try {
    const response = await API.get("/login/authorize", getAuthHeader());
    if (authenticate.status == 200) return true;
  } catch (error) {
    if (error.status == 401) return 2;
    console.error("Authentication failed:", error);
    return false;
  }
};

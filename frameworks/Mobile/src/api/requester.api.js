import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/authHeader";

const API = axios.create({
  baseURL: API_URL + "/requester",
  // withCredentials: true
});




export const newRequest= (newRequest) => API.post("/CreateRequest", newRequest);
export const getAllRequests = () => API.get("/allRequests",getAuthHeader());
export const getOneRequest = (requestId) => API.get(`/view/request/${requestId}`);
export const requesterProfile = (requestId, token) => API.get(`/profile/${requestId}`,getAuthHeader(token));
export const updateProfile = (userId, user) => API.post(`/updateProfile/${userId}`, user);
export const updatePassword = (userId, user) => API.post(`/updatePassword/${userId}`, user,getAuthHeader());
export const myRequests = (userId) => API.get(`/my/requests/${userId}`);
export const removeRequest = (requestId) => API.delete(`/delete/${requestId}`,getAuthHeader());
export const getUserId = (userId) => API.get(`/${userId}`,getAuthHeader());

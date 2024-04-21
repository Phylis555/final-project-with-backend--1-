import axios from "axios";
import { API_URL } from "./config";

const API = axios.create({
  baseURL: API_URL + "/requester",
  // withCredentials: true
});

// Function to retrieve the token from the cookie
const getTokenFromCookie = () => {
  console.log("gets here?");
  return getCookie('access_token'); // Assuming 'header' is the name of your cookie
};

// Function to create a base request configuration with authorization header
const getRequestConfig = () => {
  console.log("hello?");
  const token = getTokenFromCookie();
  const headers = {
    'Authorization': `Bearer ${token}` // Assuming the token is prefixed with 'Bearer'
  };
  console.log(headers);
  return { headers };
};



export const newRequest= (newRequest) => API.post("/CreateRequest", newRequest);
export const getAllRequests = () => API.get("/allRequests",getRequestConfig());
export const getOneRequest = (requestId) => API.get(`/view/request/${requestId}`);
export const requesterProfile = (requestId) => API.get(`/profile/${requestId}`,getRequestConfig());
export const updateProfile = (userId, user) => API.post(`/updateProfile/${userId}`, user);
export const updatePassword = (userId, user) => API.post(`/updatePassword/${userId}`, user,getRequestConfig());
export const myRequests = (userId) => API.get(`/my/requests/${userId}`);
export const removeRequest = (requestId) => API.delete(`/delete/${requestId}`,getRequestConfig());
export const getUserId = (userId) => API.get(`/${userId}`,getRequestConfig());

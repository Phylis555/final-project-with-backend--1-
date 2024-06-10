import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/common/authHeader";
import { logOut } from "../components/common/logout";

// Create an Axios instance with the base URL for the requester API
const API = axios.create({
  baseURL: API_URL + "/requester",
  // withCredentials: true
});

// Function to get the profile of a requester
export const requesterProfile = (requestId) => {
  return API.get(`/profile/${requestId}`, getAuthHeader()).catch((error) => {
        // Check if the error is due to an expired JWT token
    if (error.response.data.message === "jwt expired") {
      logOut(); // Log out the user if the token is expired
    }
  });
};

// Function to update the profile of a user
export const updateProfile = (userId, user) =>
  API.post(`/updateProfile/${userId}`, user, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

// Function to update the password of a user
export const updatePassword = (userId, user) =>
  API.post(`/updatePassword/${userId}`, user, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to get user details by user ID
export const getUserId = (userId) =>
  API.get(`/${userId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

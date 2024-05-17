import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/common/authHeader";
import { logOut } from "../components/common/logout";

const API = axios.create({
  baseURL: API_URL + "/requester",
  // withCredentials: true
});

export const newRequest = (newRequest) =>
  API.post("/CreateRequest", newRequest);
export const getAllRequests = () =>
  API.get("/allRequests", getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

export const getOneRequest = (requestId) =>
  API.get(`/view/request/${requestId}`).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

export const requesterProfile = (requestId) => {
  return API.get(`/profile/${requestId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
};

export const updateProfile = (userId, user) =>
  API.post(`/updateProfile/${userId}`, user, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

export const updatePassword = (userId, user) =>
  API.post(`/updatePassword/${userId}`, user, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

export const myRequests = (userId) =>
  API.get(`/my/requests/${userId}`).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

export const removeRequest = (requestId) =>
  API.delete(`/delete/${requestId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

export const getUserId = (userId) =>
  API.get(`/${userId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/common/authHeader";
import { logOut } from "../components/common/logout";

const API = axios.create({
  baseURL: API_URL + "/donator",
  // withCredentials: true
});

export const newDonation = (donation) =>
  API.post("/createDonation", donation, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const newRequest = (request) =>
  API.post("/sendRequest", request, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const getRequests = (donationID) =>
  API.get(`/getPendingRequests/${donationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
export const acceptDonationRequest = (requestID, reqdata) =>
  API.post(`/acceptRequest/${requestID}`, reqdata, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
export const rejectDonationRequest = (requestID, reqdata) =>
  API.post(`/rejectRequest/${requestID}`, reqdata, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
export const getPendingDonations = (userId) =>
  API.get(`/getPendingDonations/${userId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const getRejectedDonations = (userId) =>
  API.get(`/getRejectedDonations/${userId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const markDonationAsCompleted = (donationID) =>
  API.post(`/markAsCompleted/${donationID}`, undefined, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
export const getOngoingDonations = (donationID) =>
  API.get(`/getOngoingDonations/${donationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
export const getOneDonation = (donationID) =>
  API.get(`/getOneDonation/${donationID}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const getAllDonations = () => API.get(`/getDonations`);
export const getApprovedRequests = (donationID) =>
  API.get(`/getApprovedRequests/${donationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
export const getUserDonations = (userID) =>
  API.get(`/getUserDonations/${userID}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

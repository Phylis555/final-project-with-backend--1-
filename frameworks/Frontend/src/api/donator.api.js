import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/common/authHeader";
import { logOut } from "../components/common/logout";

const API = axios.create({
  baseURL: API_URL + "/donator",
  // withCredentials: true
});

// Function to create a new donation
export const newDonation = (donation) =>
  API.post("/createDonation", donation, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

// Function to create a new donation request
export const newRequest = (request) =>
  API.post("/sendRequest", request, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

// Function to get pending requests for a donation
export const getRequests = (donationID) =>
  API.get(`/getPendingRequests/${donationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to accept a donation request
export const acceptDonationRequest = (requestID, reqdata) =>
  API.post(`/acceptRequest/${requestID}`, reqdata, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to reject a donation request
export const rejectDonationRequest = (requestID, reqdata) =>
  API.post(`/rejectRequest/${requestID}`, reqdata, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to get pending donations for a user
export const getPendingDonations = (userId) =>
  API.get(`/getPendingDonations/${userId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

// Function to get rejected donations for a user
export const getRejectedDonations = (userId) =>
  API.get(`/getRejectedDonations/${userId}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

// Function to mark a donation as completed
export const markDonationAsCompleted = (donationID) =>
  API.post(`/markAsCompleted/${donationID}`, undefined, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to mark a donation as completed
export const getOngoingDonations = (donationID) =>
  API.get(`/getOngoingDonations/${donationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to get details of a specific donation
export const getOneDonation = (donationID) =>
  API.get(`/getOneDonation/${donationID}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

// Function to get all donations
export const getAllDonations = () => API.get(`/getDonations`);

// Function to get approved requests for a donation
export const getApprovedRequests = (donationID) =>
  API.get(`/getApprovedRequests/${donationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to get donations made by a specific user
export const getUserDonations = (userID) =>
  API.get(`/getUserDonations/${userID}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

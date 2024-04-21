import axios from "axios";
import { API_URL } from "./config";
import { getCookie } from "../components/common/getCookie";

const API = axios.create({
  baseURL: API_URL + "/donator",
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

export const newDonation = (donation) => API.post("/createDonation", donation, getRequestConfig());
export const newRequest = (request) => API.post("/sendRequest", request, getRequestConfig());
export const getRequests = (donationID) =>API.get(`/getPendingRequests/${donationID}`, getRequestConfig());
export const acceptDonationRequest = (requestID, reqdata) =>API.post(`/acceptRequest/${requestID}`, reqdata, getRequestConfig());
export const rejectDonationRequest = (requestID, reqdata) =>API.post(`/rejectRequest/${requestID}`, reqdata, getRequestConfig());
export const getPendingDonations = (userId) =>API.get(`/getPendingDonations/${userId}`, getRequestConfig());
export const getRejectedDonations = (userId) =>API.get(`/getRejectedDonations/${userId}`, getRequestConfig());
export const markDonationAsCompleted = (donationID) =>API.post(`/markAsCompleted/${donationID}`);
export const getOngoingDonations = (donationID) =>API.get(`/getOngoingDonations/${donationID}`, getRequestConfig());
export const getOneDonation = (donationID) =>API.get(`/getOneDonation/${donationID}`, getRequestConfig());
export const getAllDonations = () => API.get(`/getDonations`);
export const getApprovedRequests = (donationID) =>API.get(`/getApprovedRequests/${donationID}`, getRequestConfig());
export const getUserDonations = (userID) =>API.get(`/getUserDonations/${userID}`, getRequestConfig());

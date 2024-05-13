import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/authHeader";

const API = axios.create({
  baseURL: API_URL + "/donator",
  // withCredentials: true
});


export const newDonation = (donation, token) => API.post("/createDonation", donation, getAuthHeader(token));
export const newRequest = (request) => API.post("/sendRequest", request, getAuthHeader());
export const getRequests = (donationID) =>API.get(`/getPendingRequests/${donationID}`, getAuthHeader());
export const acceptDonationRequest = (requestID, reqdata) =>API.post(`/acceptRequest/${requestID}`, reqdata, getAuthHeader());
export const rejectDonationRequest = (requestID, reqdata) =>API.post(`/rejectRequest/${requestID}`, reqdata, getAuthHeader());
export const getPendingDonations = (userId) =>API.get(`/getPendingDonations/${userId}`, getAuthHeader());
export const getRejectedDonations = (userId) =>API.get(`/getRejectedDonations/${userId}`, getAuthHeader());
export const markDonationAsCompleted = (donationID) =>API.post(`/markAsCompleted/${donationID}`, undefined, getAuthHeader());
export const getOngoingDonations = (donationID) =>API.get(`/getOngoingDonations/${donationID}`, getAuthHeader());
export const getOneDonation = (donationID) =>API.get(`/getOneDonation/${donationID}`, getAuthHeader());
export const getAllDonations = () => API.get(`/getDonations`);
export const getApprovedRequests = (donationID) =>API.get(`/getApprovedRequests/${donationID}`, getAuthHeader());
export const getUserDonations = (userID) =>API.get(`/getUserDonations/${userID}`, getAuthHeader());

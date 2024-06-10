import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/authHeader";

const API = axios.create({
  baseURL: API_URL + "/donator",
  // withCredentials: true
});



export const newDonation = (donation,token) => API.post("/createDonation", donation, getAuthHeader(token));
export const newRequest = (request) => API.post("/sendRequest", request, getAuthHeader());
export const getRequests = (donationID) =>API.get(`/getPendingRequests/${donationID}`, getAuthHeader());
export const acceptDonationRequest = (requestID, reqdata) =>API.post(`/acceptRequest/${requestID}`, reqdata, getAuthHeader());
export const rejectDonationRequest = (requestID, reqdata) =>API.post(`/rejectRequest/${requestID}`, reqdata, getAuthHeader());
export const getPendingDonations = (userId,token) =>API.get(`/getPendingDonations/${userId}`, getAuthHeader(token));
export const getRejectedDonations = (userId,token) =>API.get(`/getRejectedDonations/${userId}`, getAuthHeader(token));
export const markDonationAsCompleted = (donationID) =>API.post(`/markAsCompleted/${donationID}`, undefined, getAuthHeader());
export const getOngoingDonations = (donationID, token) =>API.get(`/getOngoingDonations/${donationID}`, getAuthHeader(token));
export const getCompletedDonations = (donationID, token) =>API.get(`/getCompletedDonations/${donationID}`, getAuthHeader(token));

export const getOneDonation = (donationID) =>API.get(`/getOneDonation/${donationID}`, getAuthHeader());
export const getAllDonations = () => API.get(`/getDonations`);
export const getApprovedRequests = (donationID) =>API.get(`/getApprovedRequests/${donationID}`, getAuthHeader());
export const getUserDonations = (userID) =>API.get(`/getUserDonations/${userID}`, getAuthHeader());


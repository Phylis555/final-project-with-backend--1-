import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/authHeader";

const API = axios.create({
  baseURL: API_URL + "/donator",
  // withCredentials: true
});



export const newDonation = (donation,token) => API.post("/createDonation", donation, getAuthHeader(token));
export const newRequest = (request, token) => API.post("/sendRequest", request, getAuthHeader(token));
export const getRequests = (donationID, token) =>API.get(`/getPendingRequests/${donationID}`, getAuthHeader(token));
export const acceptDonationRequest = (requestID, reqdata,token) =>API.post(`/acceptRequest/${requestID}`, reqdata, getAuthHeader(token));
export const rejectDonationRequest = (requestID, reqdata,token) =>API.post(`/rejectRequest/${requestID}`, reqdata, getAuthHeader(token));
export const getPendingDonations = (userId,token) =>API.get(`/getPendingDonations/${userId}`, getAuthHeader(token));
export const getRejectedDonations = (userId,token) =>API.get(`/getRejectedDonations/${userId}`, getAuthHeader(token));
export const markDonationAsCompleted = (donationID, token) =>API.post(`/markAsCompleted/${donationID}`, undefined, getAuthHeader(token));
export const getOngoingDonations = (donationID, token) =>API.get(`/getOngoingDonations/${donationID}`, getAuthHeader(token));
export const getCompletedDonations = (donationID, token) =>API.get(`/getCompletedDonations/${donationID}`, getAuthHeader(token));

export const getOneDonation = (donationID, token) =>API.get(`/getOneDonation/${donationID}`, getAuthHeader(token));
export const getAllDonations = () => API.get(`/getDonations`);
export const getApprovedRequests = (donationID, token) =>API.get(`/getApprovedRequests/${donationID}`, getAuthHeader(token));
export const getUserDonations = (userID) =>API.get(`/getUserDonations/${userID}`, getAuthHeader());


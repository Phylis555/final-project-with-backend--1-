import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/authHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an Axios instance with a predefined base URL for the fund API
const API = axios.create({
  baseURL: API_URL + "/fund",
  // withCredentials: true
});

//Register a new fund for an organization
export const newFund = (organization) =>
  API.post("/create", organization, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      AsyncStorage.clear();
    }
  });

//Get funds by organization ID and status
export const getFundByOrganizationAndStatus = (organizationID, status) =>
  API.get(`/${organizationID}/status/${status}`);

//Get fund details by fund ID
export const getFundByID = (fundID) => API.get(`/${fundID}`);

//Get funds by status
export const getFundByStatus = (status) => API.get(`/status/${status}`);

export const getNFunds = (organizationId, limit) =>
  API.get(`/${organizationId}/limit/${limit}`);

//Update fund details
export const updateFund = (fundID, fund) =>
  API.post(`/update/${fundID}`, fund, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      AsyncStorage.clear();
    }
  });

  //Remove a fund by ID
export const removeFund = (fundID) =>
  API.post(`/remove/${fundID}`, undefined, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      AsyncStorage.clear();
    }
  });

//Donate to a fund
export const donateFund = (fundID, donation, token) =>
  API.post(`/donateFund/${fundID}`, donation, getAuthHeader(token)).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        AsyncStorage.clear();
      }
    }
  );

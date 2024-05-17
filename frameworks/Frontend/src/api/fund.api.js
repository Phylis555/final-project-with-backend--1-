import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/common/authHeader";
import { logOut } from "../components/common/logout";

const API = axios.create({
  baseURL: API_URL + "/fund",
  // withCredentials: true
});

export const newFund = (organization) =>
  API.post("/create", organization, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const getFundByOrganizationAndStatus = (organizationID, status) =>
  API.get(`/${organizationID}/status/${status}`);
export const getFundByID = (fundID) => API.get(`/${fundID}`);
export const getFundByStatus = (status) => API.get(`/status/${status}`);
export const getNFunds = (organizationId, limit) =>
  API.get(`/${organizationId}/limit/${limit}`);
export const updateFund = (fundID, fund) =>
  API.post(`/update/${fundID}`, fund, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const removeFund = (fundID) =>
  API.post(`/remove/${fundID}`, undefined, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const donateFund = (fundID, donation) =>
  API.post(`/donateFund/${fundID}`, donation, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

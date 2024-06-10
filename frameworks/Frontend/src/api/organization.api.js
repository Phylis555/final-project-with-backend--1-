import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/common/authHeader";
import { logOut } from "../components/common/logout";

// Create an Axios instance with a predefined base URL for the organization API
const API = axios.create({
  baseURL: API_URL + "/organization",
  // withCredentials: true
});
// Function to register a new organization
export const newOrganization = (organization) =>
  API.post("/register", organization);

// Function to get organization details by ID
export const getOrganizationByID = (organizationID) =>
  API.get(`/${organizationID}`);

// Function to change an organization's password
export const changeOrganizationPassword = (organizationID, newpassword) =>
  API.put(`/update/changePassword/${organizationID}`, newpassword,getAuthHeader()
  ).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();// Log out if JWT token is expired
    }
  });

// Function to update organization details
export const updateOrganization = (organizationID, organization) =>
  API.put(`/update/${organizationID}`, organization, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();// Log out if JWT token is expired
      }
    }
  );

// Function to update the organization's board
export const updateOrganizationBoard = (organizationID, organization) =>
  API.put(
    `/update/board/${organizationID}`,
    organization,
    getAuthHeader()
  ).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });

// Function to get the latest contributions of an organization if limit changed
export const getOrgLatestContribution = (organizationID, limit) => {
  console.log("wtf");
  return API.get(`/${organizationID}/latest/${limit}`);
};

// Function to get the dashboard summary of an organization
export const getOrgDashSummary = (organizationID) =>
  API.get(`/summary/${organizationID}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
// Function to get the contribution chart data of an organization
export const getContributionChart = (organizationID) =>
  API.get(`/contributionChart/${organizationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

// Function to get a monthly report for an organization
export const getReport = (organizationID, month) =>
  API.get(`/${organizationID}/report/${month}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

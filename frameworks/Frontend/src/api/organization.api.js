import axios from "axios";
import { API_URL } from "./config";
import { getAuthHeader } from "../components/common/authHeader";
import { logOut } from "../components/common/logout";

const API = axios.create({
  baseURL: API_URL + "/organization",
  // withCredentials: true
});

export const newOrganization = (organization) =>
  API.post("/register", organization);
export const getOrganizationByID = (organizationID) =>
  API.get(`/${organizationID}`);
export const changeOrganizationPassword = (organizationID, newpassword) =>
  API.put(
    `/update/changePassword/${organizationID}`,
    newpassword,
    getAuthHeader()
  ).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const updateOrganization = (organizationID, organization) =>
  API.put(`/update/${organizationID}`, organization, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
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
export const getOrgLatestContribution = (organizationID, limit) => {
  console.log("wtf");
  return API.get(`/${organizationID}/latest/${limit}`);
};
export const getOrgDashSummary = (organizationID) =>
  API.get(`/summary/${organizationID}`, getAuthHeader()).catch((error) => {
    if (error.response.data.message === "jwt expired") {
      logOut();
    }
  });
export const getContributionChart = (organizationID) =>
  API.get(`/contributionChart/${organizationID}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );
export const getReport = (organizationID, month) =>
  API.get(`/${organizationID}/report/${month}`, getAuthHeader()).catch(
    (error) => {
      if (error.response.data.message === "jwt expired") {
        logOut();
      }
    }
  );

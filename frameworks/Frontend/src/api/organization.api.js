import axios from 'axios';
import { API_URL } from './config';

const API = axios.create({
    baseURL: API_URL + '/organization',
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
  

export const newOrganization = (organization) => API.post("/register", organization);
export const getOrganizationByID = (organizationID) => API.get(`/${organizationID}`);
export const changeOrganizationPassword = (organizationID, newpassword) => API.put(`/update/changePassword/${organizationID}`, newpassword,getRequestConfig());
export const updateOrganization = (organizationID, organization) => API.put(`/update/${organizationID}`, organization,getRequestConfig());
export const updateOrganizationBoard = (organizationID, organization) => API.put(`/update/board/${organizationID}`, organization,getRequestConfig());
export const getOrgLatestContribution = (organizationID, limit) => API.get(`/${organizationID}/latest/${limit}`);
export const getOrgDashSummary = (organizationID) => API.get(`/summary/${organizationID}`);
export const getContributionChart = (organizationID) => API.get(`/contributionChart/${organizationID}`);
export const getReport = (organizationID, month) => API.get(`/${organizationID}/report/${month}`,getRequestConfig());
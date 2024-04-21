import axios from 'axios';
import { API_URL } from './config';

const API = axios.create({
    baseURL: API_URL + '/fund',
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
  

export const newFund = (organization) => API.post("/create", organization,getRequestConfig());
export const getFundByOrganizationAndStatus = (organizationID, status) => API.get(`/${organizationID}/status/${status}`);
export const getFundByID = (fundID) => API.get(`/${fundID}`);
export const getFundByStatus = (status) => API.get(`/status/${status}`);
export const getNFunds = (organizationId, limit) => API.get(`/${organizationId}/limit/${limit}`);
export const updateFund = (fundID, fund) => API.put(`/update/${fundID}`, fund,getRequestConfig());
export const removeFund = (fundID) => API.put(`/remove/${fundID}`,getRequestConfig());
export const donateFund = (fundID, donation) => API.post(`/donateFund/${fundID}`, donation,getRequestConfig());
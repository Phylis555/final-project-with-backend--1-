import axios from 'axios';
import { API_URL } from './config';
import { getAuthHeader } from '../components/common/authHeader';

const API = axios.create({
    baseURL: API_URL + '/organization',
    // withCredentials: true
});

  

export const newOrganization = (organization) => API.post("/register", organization);
export const getOrganizationByID = (organizationID) => API.get(`/${organizationID}`);
export const changeOrganizationPassword = (organizationID, newpassword) => API.put(`/update/changePassword/${organizationID}`, newpassword,getAuthHeader());
export const updateOrganization = (organizationID, organization) => API.put(`/update/${organizationID}`, organization,getAuthHeader());
export const updateOrganizationBoard = (organizationID, organization) => API.put(`/update/board/${organizationID}`, organization,getAuthHeader());
export const getOrgLatestContribution = (organizationID, limit) => API.get(`/${organizationID}/latest/${limit}`);
export const getOrgDashSummary = (organizationID) => API.get(`/summary/${organizationID}`, getAuthHeader());
export const getContributionChart = (organizationID) => API.get(`/contributionChart/${organizationID}`, getAuthHeader());
export const getReport = (organizationID, month) => API.get(`/${organizationID}/report/${month}`,getAuthHeader());
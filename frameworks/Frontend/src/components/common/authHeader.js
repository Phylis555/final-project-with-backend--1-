// Function to retrieve the token from the cookie
import { getCookie } from "./getCookie";

const getTokenFromCookie = () => {
    console.log("gets here?");
    return getCookie('access_token'); // Assuming 'header' is the name of your cookie
  };
  
  // Function to create a base request configuration with authorization header
export const getAuthHeader = () => {
    const token = getTokenFromCookie();
    const headers = {
      'Authorization': `Bearer ${token}` // Assuming the token is prefixed with 'Bearer'
    };
    console.log(headers);
    return { headers };
  };


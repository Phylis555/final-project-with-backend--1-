// Function to retrieve the token from the cookie


  // Function to create a base request configuration with authorization header
export const getAuthHeader = (accessToken) => {

    console.log("gets to token?");
    console.log(accessToken);


    const headers = {
      'Authorization': `Bearer ${accessToken}` // Assuming the token is prefixed with 'Bearer'
    };
    console.log(headers);
    return { headers };
  };


//Function to get the value of a cookie by its name.
export const getCookie = (cname) => {
    let name = cname + "=";
        // Split the cookie string into an array of cookie substrings
    let ca = document.cookie.split(";");
    // Loop through each cookie substring
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
         // Remove leading spaces from the cookie substring
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
         // If the cookie substring starts with the specified name, return its value
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    // If the cookie with the specified name is not found, return false
    return false;
}
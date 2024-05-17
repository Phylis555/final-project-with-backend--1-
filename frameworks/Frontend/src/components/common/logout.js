export const logOut = () => {
  console.log("got here?");
  document.cookie = "uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

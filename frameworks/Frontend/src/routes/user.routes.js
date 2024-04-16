import React from "react";
import { Route, Routes } from "react-router-dom";
import RequesterProfile from "../components/requester/requesterProfile";
import RequesterSignIn from "../components/requester/requesterSignIn";
import RequesterSignUp from "../components/requester/requesterSignUp";
import ResetPassword from "../components/requester/resetPassword";
import ChangePassword from "../components/requester/changePassword";

import RequesterProfileUpdate from "../components/requester/updateProfileDetails";

export default function User() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<RequesterSignUp />} />
        <Route path="/signin" element={<RequesterSignIn />} />
        <Route path="/profile/:userId" element={<RequesterProfile />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/changePassword/:token" element={<ChangePassword />} />

        <Route path="/profile/update/:userId" element={<RequesterProfileUpdate/>} />
      </Routes>
    </>
  );
}

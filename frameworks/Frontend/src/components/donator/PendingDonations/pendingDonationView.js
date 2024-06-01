import React, { useEffect, useState } from "react";
import { getPendingDonations } from "../../../api/donator.api";
import { getCookie } from "../../common/getCookie";
import LoadingSpinner from "../../common/LoadingSpinner";
import NoItems from "../noItems";
import SideNav from "../sideNav";
import PendingDonationCard from "./pendingDonationCard";

export default function PendingDonationView() {
  // State variables for managing donations data and loading state
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  // Fetching the user ID from the cookie
  useEffect(() => {
    setUserId(getCookie("uId"));
  }, []);

  // Fetching pending donations data from the API
  useEffect(() => {
    if (userId) {
      setLoading(true);
  
      getPendingDonations(userId)
        .then((res) => {
          setLoading(false);
  
          if (res.data.length > 0) {
            setDonations(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div>
      {/* Side navigation bar */}
      <SideNav pending="true" />
      {/* Main content */}
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
        <div className="container-fluid py-4" >
          <div className="row align-items-center">
            {/* Heading */}
            <>
              <h3
                style={{
                  textAlign: "center",
                }}
              >
                תרומות בהמתנה לאישור
              </h3>
            </>

            {/* Conditional rendering based on loading state and donations data */}
            {loading ? (
              // Loading spinner
              <div style={{marginTop: 250,}}>
                <LoadingSpinner />
              </div>
            ) : donations.length == 0 ? (
              // No pending donations message
              <NoItems />
            ) : (
              // Render the list of pending donations
              <div className="row row-cols-2 row-cols-xl-3 row-cols-md-2 row-cols-sm-1">
                {donations.map(function (f) {
                  return (
                    <div className="col" key={f._id}>
                      {/* Pending donation card component */}
                      <PendingDonationCard
                        donationTitle={f.donationTitle}
                        donationDescribe={f.donationDescription}
                        _id={f._id}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

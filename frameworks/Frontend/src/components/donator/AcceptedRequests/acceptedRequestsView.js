import React, { useEffect, useState } from "react";
import { getOngoingDonations } from "../../../api/donator.api";
import { getCookie } from "../../common/getCookie";
import LoadingSpinner from "../../common/LoadingSpinner";
import NavButton from "../../NavButton";
import NoItems from "../noItems";
import SideNav from "../sideNav";
import AcceptedRequestsCard from "./acceptedRequestedCard";

export default function AcceptedRequestView() {
  const [donations, setDonation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(getCookie("uId"));// Set user ID from cookie
    //fetching all inbound item data from the database
  }, [userId]);
  console.log(userId);


  useEffect(() => {
    setLoading(true);
  // Fetching all ongoing donation data from the database using user ID
  getOngoingDonations(userId)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.length > 0) {
          setLoading(false);
          setDonation(res.data); // Set ongoing donations to state variable
          console.log(res.data);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [userId]);

  // Function to toggle side navigation
  const toggleSidenav = (e) => {
    e.preventDefault();
    document.body.classList.remove("g-sidenav-pinned");
  };
  return (
    <div>
      <SideNav accepted="true" />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavButton />
        <div className="container-fluid py-4" onClick={toggleSidenav}>
          <div className="row align-items-center"></div>
          <div class="container" style={{ paddingTop: 20 }}>
             {/* Render loading spinner if loading */}
            {loading ? (
              <div
                style={{
                  marginTop: 250,
                }}
              >
                <LoadingSpinner />
              </div>
            ) : donations.length == 0 ? (
              <>
                <NoItems />
              </>
            ) : (
             // Map through ongoing donations and render AcceptedRequestsCard component for each
              donations.map(function (f) {
                return (
                  <AcceptedRequestsCard
                    donationTitle={f.donationTitle}
                    _id={f._id}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

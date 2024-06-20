import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardCard from "./dashboardCard";
import SideNav from "../sideNav";
import {
  getOngoingDonations,
  getPendingDonations,
  getRejectedDonations,
} from "../../../api/donator.api";
import { getCookie } from "../../common/getCookie";

export default function ActiveDonations() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(getCookie("uId")); // Set user ID from cookie
    //fetching all inbound item data from the database
  }, [userId]);


  // State variables to hold rejected, pending, and active donations
  const [rejectedDonations, setRejected] = useState([]);
  const [pendingDonations, setPending] = useState([]);
  const [activeDonations, setActive] = useState([]);


  useEffect(() => {
    if (userId) {
      getPendingDonations(userId)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setPending(res.data); // Set pending donations to state variable
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });

      getOngoingDonations(userId)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setActive(res.data); // Set active donations to state variable
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });

      getRejectedDonations(userId)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setRejected(res.data); // Set rejected donations to state variable
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [userId]);


  // Function to toggle side navigation
  const toggleSidenav = (e) => {
    e.preventDefault();
    document.body.classList.remove("g-sidenav-pinned");
  };
  return (
    <>
      <SideNav dashboard="true" />
      <main className="main-content position-relative h-100 border-radius-lg ">
        <div className="d-flex container-fluid py-2 " onClick={toggleSidenav}>

          {/* Container for dashboard cards */}
          <div className=" container justify-content-center" style={{ paddingTop: 20 }}>
            <div className=" row d-flex">

              {/* Dashboard card for pending donations */}
              <div className="mb-4 p-2 col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Link  to="/donator/pendingDonations">
                  <DashboardCard
                    image="https://i.postimg.cc/5t0vBGNQ/ds-5.png"
                    title="תרומות בהמתנה לאישור"
                    count={pendingDonations.length}
                  />
                </Link>
              </div>

              {/* Dashboard card for active donations */}
              <div className="mb-4 p-2 col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <Link  to="/donator/myDonations">
                <DashboardCard
                  image="https://i.postimg.cc/T12tg0Sk/ds-4.png"
                  title="תרומות פעילות"
                  count={activeDonations.length}
                />
                </Link>
              </div>

              {/* Dashboard card for rejected donations */}
              <div className="mb-4 p-2 col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Link  to="/donator/rejectedDonations">
                  <DashboardCard
                    image="https://i.postimg.cc/tCFmYzKx/ds-8.png"
                    title="תרומות שנדחו"
                    count={rejectedDonations.length}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

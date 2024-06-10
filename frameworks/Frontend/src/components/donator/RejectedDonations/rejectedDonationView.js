import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { getRejectedDonations } from "../../../api/donator.api";
import { getCookie } from "../../common/getCookie";
import NoItems from "../noItems";
import SideNav from "../sideNav";
import RejectedDonationsCard from "./rejectedDonationsCard";

export default function RejectedDonationView() {
  // State to store donations and userId
  const [donations, setDonations] = useState([]);
  const [userId, setUserId] = useState("");

    // UseEffect to set the userId from cookies when the component mounts
  useEffect(() => {
    setUserId(getCookie("uId"));
  }, [userId]);

  // Fetch rejected donations when userId changes
  useEffect(() => {
    if (userId) {
      getRejectedDonations(userId)
        .then((res) => {
          if (res.data.length > 0) {
            setDonations(res.data);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [userId]);


  return (
    <div>
      <SideNav rejected="true" />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "  dir="rtl">
        <div className="container-fluid py-4" >
          <div className="row align-items-center">
            {donations.length == 0 ? (
              <NoItems />
            ) : (
              <>
                <h3>תרומות שנדחו</h3>
                <div className="row row-cols-2 row-cols-xl-3 row-cols-md-2 row-cols-sm-1 " style={{ overflow: "hidden",}}>
                  {donations.map(function (f) {
                    return (
                      <div className="col" key={f._id}>
                        <RejectedDonationsCard
                          donationTitle={f.donationTitle}
                          donationDescribe={f.donationDescription}
                          _id={f._id}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

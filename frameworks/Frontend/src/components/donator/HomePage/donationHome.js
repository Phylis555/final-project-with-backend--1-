import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  getAllDonations,
  markDonationAsCompleted,
} from "../../../api/donator.api";
import { getCookie } from "../../common/getCookie";
import LoadingSpinner from "../../common/LoadingSpinner";
import Footer from "../../Footer";
import NavBar from "../../NavBar";
import DonationDescription from "../DonationView/DonationViewComponents/DonationDescription";
import DonationHomeCard from "./donationHomeCard";
import { getRemainingTime } from "../../common/getRemainingTime";

export default function DonationHome() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false); // הוספת סטייט לפתיחה או סגירה של חלון המיון

  const markAsCompleted = (id) => {
    if (userId == false) {
      swal({
        title: "אתה לא מחובר",
        text: "התחבר כדי לבקש תרומה",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          navigate("../../user/signin");
        }
      });
    } else {
      navigate("../createDonation");
    }
  };
  useEffect(() => {
    setUserId(getCookie("uId"));
  }, []);

  const [loading, setLoading] = useState(false);
  const [donation, setDonation] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllDonations()
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.length > 0) {
          setDonation(res.data);
          console.log(res.data);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  // const handleSortChange = (event) => {
  //   setSortBy(event.target.value);
  // };

  const filterDonations = (donations) => {
    if (sortBy === "closestEndDate") {
      return donations.sort((a, b) => new Date(a.donationEndDate) - new Date(b.donationEndDate));
    } else if (sortBy === "furthestEndDate") {
      return donations.sort((a, b) => new Date(b.donationEndDate) - new Date(a.donationEndDate));
    } else if (sortBy === "oldestCreatedDate") {
      return donations.sort((a, b) => new Date(b.donationStartDate) - new Date(a.donationStartDate));
    } else if (sortBy === "newestCreatedDate") {
      return donations.sort((a, b) => new Date(a.donationStartDate) - new Date(b.donationStartDate));
    } else {
      return donations;
    }
  };

  return (
    <>
      <div class="overflow-hidden" style={{}}>
        <NavBar />
        {loading ? (
          <div className="mt-6 min-vh-100">
            <LoadingSpinner />
          </div>
        ) : (
          <>
              
              <div class="row d-flex justify-content-sm-around  my-3" dir="rtl">
                 <div className="col-lg-2 col-md-6 me-7">
                  <div className={`dropdown ${sortDropdownOpen ? 'show' : ''}`}>
                    <button
                      className="btn btn-secondary dropdown-toggle "
                      type="button"
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      aria-expanded={sortDropdownOpen}
                    >  מיון{" "}
                    </button>
                    <ul className={`dropdown-menu ${sortDropdownOpen ? 'show' : ''}`}>
                      <li><button className="dropdown-item" onClick={() => setSortBy("closestEndDate")}>תאריך סיום קרוב ביותר</button></li>
                      <li><button className="dropdown-item" onClick={() => setSortBy("furthestEndDate")}>תאריך סיום רחוק ביותר</button></li>
                      <li><button className="dropdown-item" onClick={() => setSortBy("oldestCreatedDate")}>תאריך יצירה רחוק ביותר</button></li>
                      <li><button className="dropdown-item" onClick={() => setSortBy("newestCreatedDate")}>תאריך יצירה קרוב ביותר</button></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-8 ">
                  <div className="input-group input-group-outline bg-white">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="חיפוש"
                      aria-label="Search"
                      onChange={(e) => {
                        setsearchTerm(e.target.value);
                      }}
                    />
                  </div>
                </div>
               
                <div className="col-lg-4 col-md-6 col-sm-8 me-3">
                  <button className="btn btn-primary " onClick={markAsCompleted}>
                    בקשה ליצירת תרומה חדשה
                  </button>
                </div>
              </div>

            <div
              dir="rtl"
              class="row row-cols-4"
              style={{
                marginLeft: 20,
                marginRight: 20,
                overflow: "hidden",
              }}
            >
              {filterDonations(donation)
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.donationTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.donationDescription.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map(function (f) {
                  console.log(f);
                  return (
                    <Link to={"/donator/view/" + f._id}>
                      <DonationHomeCard donation={f} />
                    </Link>
                  );
                })}
            </div>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

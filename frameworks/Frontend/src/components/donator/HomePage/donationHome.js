import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  getAllDonations,
  markDonationAsCompleted,
  getOneDonation,
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
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sortFilterDropdownOpen, setSortFilterDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [donationDetails, setDonationDetails] = useState([]);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    getAllDonations()
      .then((res) => {
        setLoading(false);
        if (res.data.length > 0) {
          setDonation(res.data);
          setDonationDetails(res.data);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const categoriesArray = [];

    donationDetails.forEach((donation) => {
      donation.wantedItems.forEach((item) => {
        if (!categoriesArray.includes(item.item.itemCategory)) {
          categoriesArray.push(item.item.itemCategory);
        }
      });
    });

    setCategories(categoriesArray);
  }, [donationDetails]);

  const [loading, setLoading] = useState(false);
  const [donation, setDonation] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filterDonations = (donations) => {
    if (sortBy === "closestEndDate") {
      return donations.sort(
        (a, b) => new Date(a.donationEndDate) - new Date(b.donationEndDate));
    } else if (sortBy === "furthestEndDate") {
      return donations.sort(
        (a, b) => new Date(b.donationEndDate) - new Date(a.donationEndDate));
    } else if (sortBy === "oldestCreatedDate") {
      return donations.sort(
        (a, b) => new Date(b.donationStartDate) - new Date(a.donationStartDate));
    } else if (sortBy === "newestCreatedDate") {
      return donations.sort(
        (a, b) => new Date(a.donationStartDate) - new Date(b.donationStartDate));
    } else if (sortBy === "popularity") {
      return donations.sort((a, b) => b.numberOfRequests - a.numberOfRequests);
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
            <div
              class="row d-flex justify-content-sm-around mx-5 my-3"
              dir="rtl"
            >
              <div className="col-lg-1 col-md-1 me-4 ">
                <div className={`dropdown ${sortDropdownOpen ? "show" : ""}`}>
                  <button
                    className="btn btn-secondary dropdown-toggle "
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    aria-expanded={sortDropdownOpen}
                  >
                    {" "}
                    מיון{" "}
                  </button>
                  <ul
                    className={`dropdown-menu ${
                      sortDropdownOpen ? "show" : ""
                    }`}
                  >
                    <li
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      aria-expanded={sortDropdownOpen}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => setSortBy("popularity")}
                      >
                        מספר תרומות
                      </button>
                    </li>
                    <li
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      aria-expanded={sortDropdownOpen}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => setSortBy("closestEndDate")}
                      >
                        תאריך סיום קרוב ביותר
                      </button>
                    </li>
                    <li
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      aria-expanded={sortDropdownOpen}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => setSortBy("furthestEndDate")}
                      >
                        תאריך סיום רחוק ביותר
                      </button>
                    </li>
                    <li
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      aria-expanded={sortDropdownOpen}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => setSortBy("oldestCreatedDate")}
                      >
                        תאריך יצירה רחוק ביותר
                      </button>
                    </li>
                    <li
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      aria-expanded={sortDropdownOpen}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => setSortBy("newestCreatedDate")}
                      >
                        תאריך יצירה קרוב ביותר
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-1 col-sm-1">
                <div className="dropdown" dir="rtl">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    onClick={() =>
                      setSortFilterDropdownOpen(!sortFilterDropdownOpen)
                    }
                    aria-expanded={sortFilterDropdownOpen}
                  >
                    בחר קטגוריה
                  </button>
                  <ul
                    className={`dropdown-menu ${
                      sortFilterDropdownOpen ? "show" : ""
                    }`}
                  >
                    <li
                      onClick={() => {
                        setSelectedCategory("");
                        setSortFilterDropdownOpen(!sortFilterDropdownOpen);
                      }}
                    >
                      <button className="dropdown-item">הכל</button>
                    </li>
                    {categories.map((category, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelectedCategory(category);
                          setSortFilterDropdownOpen(!sortFilterDropdownOpen);
                        }}
                      >
                        <button className="dropdown-item">{category}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
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

              <div className="col-lg-3 col-md-3 col-sm-4 ms-2">
                {userId ? (
                  <button className="btn btn-primary" onClick={markAsCompleted}>
                    בקשה ליצירת תרומה חדשה
                  </button>
                ) : (
                  // <button className="btn btn-primary" disabled>
                  //   התחבר כדי ליצור תרומה
                  // </button>
                  <Link to={"../../user/signin"}>
                    <button className="btn btn-outline-info">
                      התחבר כדי ליצור תרומה
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <div
              dir="rtl"
              className="row row-cols-4 "
              style={{
                marginLeft: 20,
                marginRight: 20,
                overflow: "hidden",
              }}
            >
              {filterDonations(donationDetails)
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.donationTitle
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.donationDescription
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (selectedCategory === "") {
                    return val;
                  } else {
                    console.log(selectedCategory);
                    console.log(
                      val.wantedItems.some((item) => item.item.itemCategory)
                    );

                    return val.wantedItems.some(
                      (item) => item.item.itemCategory === selectedCategory
                    );
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

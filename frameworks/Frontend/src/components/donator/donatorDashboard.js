import React, { useState, useEffect } from "react";
import "./css/donatorCard.css";
import axios from "axios";
import jspdf from "jspdf";
import "jspdf-autotable";
import {BrowserRouter as Router,Link,} from "react-router-dom";
import img from "./banner.png";
import swal from "sweetalert";
import NoItems from "./noItems";
import NavButton from "../NavButton";
import SideNav from "./sideNav";
import { markDonationAsCompleted ,getOngoingDonations, getCompletedDonations} from "../../api/donator.api";
import LoadingSpinner from "../common/LoadingSpinner";
import { getCookie } from "../common/getCookie";
import { getRemainingTime } from "../common/getRemainingTime";
import { getAuthHeader } from "../common/authHeader";


export default function DonatorDashboard() {
  // State variables to manage user ID, donations, and loading status
  const [userID, setUserId] = useState("");
  const [donations, setDonations] = useState([]);
  const [ongoingDonations, setOngoingDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setsearchTerm] = useState("");


   // Get user ID from cookies
   useEffect(() => {
    setUserId(getCookie("uId"));
  }, [userID]);

  // Toggle the side navigation bar
  const toggleSidenav = (e) => {
    e.preventDefault();
    document.body.classList.remove("g-sidenav-pinned");
  };

    // Fetch ongoing donations from the database
    useEffect(() => {
      if (userID) {
        setLoading(true);
        // Fetching all ongoing donation data from the database using user ID
        getOngoingDonations(userID)
        .then((res) => {
          setLoading(false);
          if (res.data.length > 0) {
            setDonations(res.data);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
      }
    }, [userID]);

    // Fetch completed donations from the database
  useEffect(() => {
    if (userID) {
    setLoading(true);
    getCompletedDonations(userID)
          .then((res) => {
        setLoading(false);
        if (res.data.length > 0) {
          setOngoingDonations(res.data);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
    }
  }, [userID]);

// Handle donation deletion
  const deleteDonation = (id) => {
    swal({ 
      title: "!שים לב",
      text: "פריט לא היה זמין לאחר מחיקתו",
      icon: "warning",
      buttons: true,
      textDirection: "rtl",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8070/donator/deleteDonation/${id}`,getAuthHeader())
          .then((res) => {
            if (willDelete) {
              swal("הפריט נמחק בהצלחה", {icon: "success", });
              setTimeout(function () { window.location.reload();}, 1000);
            }
          })
          .catch((e) => {
            swal("File Is Not Deleted");
          });
      }
    });
  };

  // Mark donation as completed
  const markAsCompleted = (id) => {
    swal({
      title: "שים לב",
      text: "התרומה תועבר לתרומות שהושלמו",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        markDonationAsCompleted(id)
          .then((res) => {
            if (willDelete) {
              swal("הפריט הועבר בהצלחה", {  icon: "success", });
              setTimeout(function () { window.location.reload();}, 1000);
            }
          })
          .catch((e) => {
            swal("התרומה לא עברה");
          });
      }
    });
  };

  // Generate a report
  const generateCompletedReport = (tickets) => {
    const doc = new jspdf();
    const tableColumn = [
      "Donation ID",
      "Donation Title",
      "Email",
      "Contact Number",
      "Number of req",
    ];
    const tableRows = [];

    tickets.map((ticket) => {
      const ticketData = [
        ticket._id,
        ticket.donationTitle,
        ticket.email,
        ticket.contactNumber,
        ticket.numberOfRequests,
      ];
      tableRows.push(ticketData);
    });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    // Add the banner image
    doc.addImage(img, "PNG", 0, 0, 210, 38);
    // Add the table
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 8 },
      startY: 40,
    });
    // Save the PDF
    doc.save(`Donations_Report_${dateStr}.pdf`);
  };

  return (
    <>
     <SideNav myDonations="true" dir="rtl" />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg" style={{ overflow: "hidden" }}>
       {/* Navigation button */}
        <NavButton />
        <div className="container-fluid py-4" onClick={toggleSidenav} dir="rtl">
          <div className="row align-items-center">
            <div className="kgcard" style={{ marginLeft: 150, overflow: "hidden" }}>
              <div className="card-body">
                <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ width: 500, alignItems: "center" }}>
                  <li className="nav-item" role="presentation">
                     {/* Tab for active donations */}
                    <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">
                      תרומות פעילות
                    </button>
                  
                  </li>
                  {/* Tab for completed donations */}
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="false">
                      תרומות שהושלמו
                    </button>
                  </li>
                </ul>
                 {/* Tab for Completed Donations */}
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="profile-tab">
                      <div className="d-flex justify-content-between" style={{ marginTop: 10 }}>
                         {/* Display loading spinner if loading */}
                        {loading ? (
                          <div style={{ marginLeft: 100, marginTop: 100,}}>
                            <LoadingSpinner />
                          </div>
                        ) : ongoingDonations.length == 0 ? (
                            <NoItems />
                        ) : (
                          <div>
                            <button
                              className="btn btn-danger" onClick={() => generateCompletedReport(ongoingDonations)}>
                              יצירת דוח
                            </button>
                            <div className="head1" style={{ marginRight: "555px", width: 400 }}>
                              <div className="input-group mb-3 input-group input-group-outline mb-3" dir="rtl">
                                <input
                                  className="form-control form-control-sm ml-3 w-75"
                                  type="text"
                                  id="Search"
                                  placeholder="חיפוש"
                                  aria-label="Search"
                                  onChange={(e) => {
                                    setsearchTerm(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xxl-3 mb-7">
                      {ongoingDonations
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
                          return f == null ? (
                            <h1>אין פריטים</h1>
                          ) : (
                            <div className="courses-container"  dir="rtl" key={f._id}>
                              <div className="course">
                                <div className="course-info">
                                  <div className="progress-container">
                                    {/* Delete button */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                    <span onClick={() => deleteDonation(f._id)} style={{cursor: "pointer",}}> מחק</span> <br />
                                  </div>
                                  <Link
                                    to={"/donator/view/" + f._id}style={{color: "black",}}>
                                    <h2 className="card-title" >{f.donationTitle}</h2>
                                  </Link>
                                    <h6 className="my-3 card-text">{f.donationDescription}</h6>   
                                  {/* Request button */}                         
                                  <div className="d-flex my-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-people-fill" viewBox="0 0 16 16">
                                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                      <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                    </svg>
                                    <Link to={{ pathname:"/donator/viewRequest/" + f._id, state: {fromAccepted: true }}}>
                                      <span className="seereq me-2">
                                        ראה בקשות
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="tab-pane show active fade" id="profile" role="tabpanel" aria-labelledby="contact-tab">
                      <div className="d-flex justify-content-between  kgcard" style={{ marginTop: 10 }}>
                          {donations.length === 0 ? (
                            <NoItems />
                          ) : (
                            <div>
                              <button className="btn btn-danger" onClick={() => generateCompletedReport(donations)}>
                                  יצירת דוח
                              </button>
                              <div className="head1" style={{ marginRight: "555px", width: 400 }}>
                                <div className="input-group mb-3 input-group input-group-outline mb-3">
                                    <input
                                      className="form-control form-control-sm ml-3 w-75"
                                      type="text"
                                      id="search"
                                      placeholder="חיפוש"
                                      aria-label="Search"
                                      onChange={(e) => {
                                        setsearchTerm(e.target.value);
                                      }}
                                    />
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xxl-3 mb-7">
                          {donations
                            .filter((val) => {
                              if (searchTerm === "") {
                                  return val;
                              } else if (
                                  val.donationTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  val.donationDescription.toLowerCase().includes(searchTerm.toLowerCase())
                              ) {
                                  return true;
                              }
                            })
                            .map(function (f) {
                              return f == null ? (
                                  <h1>אין פריטים</h1>
                              ) : (
                              <div className="col mb-4" key={f._id}>
                                  <div className="courses-container">
                                      <div className="course">
                                          <div className="course-info">
                                            <div className="progress-container">
                                              {/* Delete button */}
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                              </svg>
                                              <span onClick={() => deleteDonation(f._id)} style={{cursor: "pointer",}}> מחק</span> <br />
                                               {/* Edit button */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                                {/* Edit link */}
                                                <Link to={`/donator/dashboard/donator/editDonation/${f._id}`}>
                                                  <span data-toggle="modal" data-target="#exampleModalCenter"> ערוך</span>
                                                </Link>
                                            </div >
                                            <div className="justify-content-around">
                                              <Link to={"/donator/view/" + f._id} style={{ color: "black" }}><h2 className="card-title">{f.donationTitle}</h2></Link>
                                              <h6 className="my-3 card-text">{f.donationDescription}</h6>   
                                            </div >
                                          <div className="d-flex justify-content-around">
                                            <div>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-alarm-fill" viewBox="0 0 16 16">
                                                <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                                              </svg>
                                              <span className="timeleft me-1"> {getRemainingTime(f.donationEndDate)}</span>
                                            </div>
                                            <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-people-fill" viewBox="0 0 16 16">
                                              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                              <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                            </svg>
                                            <Link to={{ pathname: "/donator/viewRequest/" + f._id, state: { fromAccepted: false } }}>
                                              <span className="seereq me-1"> ראה בקשות</span>
                                            </Link>
                                            </div>
                                            <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                            </svg>
                                            <span className="completed me-1" onClick={() => markAsCompleted(f._id)}>
                                              סמן כהושלם
                                            </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                      </div>
                    </div>
                </div>
              </div>
           
          </div>
        </div>
      </main>
    </>
  );
}

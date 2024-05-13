import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { getOneDonation } from "../../../api/donator.api";
import { getCookie } from "../../common/getCookie";
import { getRemainingTime } from "../../common/getRemainingTime";
import LoadingSpinner from "../../common/LoadingSpinner";
import Footer from "../../Footer";
import NavBar from "../../NavBar";
import ContactDetails from "./DonationViewComponents/ContactDetails";
import DonationDescription from "./DonationViewComponents/DonationDescription";
import DonationIcon from "./DonationViewComponents/DonationIcons";
import ViewImage from "./DonationViewComponents/ViewImage";
import swal from "sweetalert";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import { getAuthHeader } from "../../common/authHeader";
import NavButton from "../../admin/donation/NavButton";
import { FaWhatsapp } from "react-icons/fa";

export default function DonationView() {
  const location = useLocation();
  const fromAdmin = location.state?.fromAdmin;
  const accepted = location.state?.accepted;
  const req = location.state?.req;
  const [donation, setDonation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(getCookie("uId")); // Get userId from cookie or authentication system
  }, []);

  useEffect(() => {
    setLoading(true);
    getOneDonation(id)
      .then((res) => {
        setLoading(false);
        setDonation(res.data.donation);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const ddate = getRemainingTime(donation.donationEndDate);
  console.log(ddate);

  const onAccept = (id) => {
    swal({
      textDirection: "rtl",
      title: "?אתה בטוח",
      text: "!הבקשה תאושר",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`http://localhost:8070/admin/updostauts/${id}`, null, getAuthHeader()).then(() => {
          if (willDelete) {
            swal("הבקשה אושרה בהצלחה", {
              icon: "success",
            });
            setTimeout(function () {
              navigate(-1);
            }, 2000);
          } else {
            swal("File Is Not Deleted");
          }
        });
      }
    });
  };

  const onDelete = (id) => {
    swal({
      textDirection: "rtl",
      title: "?אתה בטוח",
      text: "!הבקשה תדחה",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:8070/admin/rejectdonation/${id}`, null, getAuthHeader())
          .then(() => {
            if (willDelete) {
              swal("הבקשה נדחתה", {
                icon: "success",
              });
              setTimeout(function () {
                navigate(-1);
              }, 2000);
            } else {
              swal("File Is Not Deleted");
            }
          });
      }
    });
  };


  useEffect(() => {
    if (donation && donation.wantedItems) {
      const received = donation.wantedItems.reduce((acc, item) => acc + item.receivedAmount, 0);
      const amount = donation.wantedItems.reduce((acc, item) => acc + item.wantedQuantity, 0);
      setTotalReceived(received);
      setTotalAmount(amount);
    }
  }, [donation]);
  

  return (
    <>
           { getCookie("roles") === '2001' ? "" : (<div className='mb-3'><NavBar /></div>)}
      {/* <NavBar /> */}

      <div className="container" dir="rtl">
      <i className="bi bi-arrow-left-circle fs-4 cursor-pointer"
          onClick={() => navigate(-1)}> הקודם</i>
        {loading ? (
          <div
            style={{
              marginTop: 250,
              minHeight: "100vh",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <div
            className="mainDiv"
            style={{
              marginLeft: 100,
              paddingTop: 20,
              marginRight: 100,
              marginBottom: 100,
            }}
          >
            <h2
              style={{
                marginBottom: 15,
              }}
            >
              {donation.donationTitle}
            </h2>

            <div className="d-flex card-body ">
              <ViewImage image={donation.donationImage} />
            </div>

            <div className="mx-5 mt-2">
              <DonationIcon
                location={donation.location}
                requests={donation.numberOfRequests}
                remaining={
                  getRemainingTime(donation.donationEndDate).includes("-")
                    ? 0 + " שעות"
                    : getRemainingTime(donation.donationEndDate)
                }
              />
            </div>
            <div>
              {donation && totalReceived > 0 && (
                <ProgressBar
                  completed={Math.round(totalReceived / totalAmount * 100 ) }
                  className="px-4 card-body"
                  labelColor="#FDE1FF"
                />
              )}
            </div>


            {donation.wantedItems && donation.wantedItems.length > 0 && (
              <div class="card-body card bg-white my-3 text-center">
                <div className="mt-4">
                  <h4 className="mb-3">רשימת הפריטים שמבקשים בתרומה:</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">שם הפריט</th>
                        <th scope="col">כמות מבוקשת</th>
                        <th scope="col">קטגוריה</th>
                        <th scope="col">כמות נותרת</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donation.wantedItems.map((wantedItem, index) => (
                        <tr key={index}>
                          <td>{wantedItem.item.itemName}</td>
                          <td>{wantedItem.wantedQuantity}</td>
                          <td>{wantedItem.item.itemCategory}</td>
                          <td>
                            <span className={`badge ${wantedItem.wantedQuantity > wantedItem.receivedAmount ? 'bg-primary' : 'bg-danger'} rounded-pill`}>
                              {wantedItem.wantedQuantity - wantedItem.receivedAmount}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="row">
              <div class="col-xl-6 col-sm-5">
                <div class="card bg-light bg-white">
                  <div class="card-body">
                    <ContactDetails
                      email={donation.email}
                      mobile={"0"+donation.contactNumber}
                    />
                    {userId && (
                      <a
                        href={`https://wa.me/972${donation.contactNumber}?text=${encodeURIComponent("שלום, ראיתי את התרומה שלך דרך אתר Instant Giving ואני מעוניין לתרום לך! האם תוכל לשלוח לי עוד פרטים על התרומה?")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success mt-3"
                      >
                      <FaWhatsapp className="ms-2" /> שלח הודעה ב whatsapp
                    </a>
                    )}
                  </div>
                </div>
              </div>

              <div class="col-6 ">
                <div class="card bg-light bg-white">
                  <div class="card-body">
                    <DonationDescription
                      description={donation.donationDescription}
                    />
                  </div>
                </div>
              </div>
            
              <div className="d-flex justify-content-center mt-4">
                {req && fromAdmin ? (
                  <>
                    <button
                      class="btn btn-outline-success me-3 fs-5"
                      onClick={() => {
                        onAccept(donation._id);
                      }}
                    >
                      אשר
                    </button>
                    <button
                      class="btn btn-outline-danger me-3 fs-5"
                      onClick={() => {
                        onDelete(donation._id);
                      }}
                    >
                      דחה
                    </button>
                  </>
                ) : accepted && fromAdmin || (donation.status === "completed" ||donation.status === "pending") ? (
                  <>
                    <h2></h2>
                  </>
              
                // ) : (
                //   <Link to={`/donator/sendRequest/${id}`}>
                //     <button class="btn btn-info">שלח בקשה</button>
                //   </Link>
                // )}

                ) : userId ? (
                    <Link to={`/donator/sendRequest/${id}`}>
                      <button className="btn btn-info">שלח בקשה</button>
                    </Link>
                ) : (
                  <button className="btn btn-outline-info" onClick={() => navigate("/user/signin")}>
                    התחבר כדי לתרום
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

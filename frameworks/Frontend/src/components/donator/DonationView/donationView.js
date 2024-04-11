import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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
        axios.put(`http://localhost:8070/admin/updostauts/${id}`).then(() => {
          if (willDelete) {
            swal("הבקשה אושרה בהצלחה", {
              icon: "success",
            });
            setTimeout(function () {
              window.location.reload();
            }, 3000);
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
          .put(`http://localhost:8070/admin/rejectdonation/${id}`)
          .then(() => {
            if (willDelete) {
              swal("הבקשה נדחתה", {
                icon: "success",
              });
              setTimeout(function () {
                window.location.reload();
              }, 3000);
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
      <NavBar />

      <div className="container" dir="rtl">
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
                  completed={Math.round(totalReceived / totalAmount * 100 * 100) / 100} // rounded to 2 decimal places
                  className="px-4"
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
              <div class="col-6">
                <div class="card bg-light bg-white">
                  <div class="card-body">
                    <ContactDetails
                      email={donation.email}
                      mobile={donation.contactNumber}
                    />
                  </div>
                </div>
              </div>

              <div class="col-6">
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
                      class="btn btn-success"
                      onClick={() => {
                        onAccept(donation._id);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      class="btn btn-danger"
                      onClick={() => {
                        onDelete(donation._id);
                      }}
                    >
                      Reject
                    </button>
                  </>
                ) : accepted && fromAdmin ? (
                  <>
                    <h2>_</h2>
                  </>
                ) : donation.status === "completed" ||donation.status === "pending" ? (
                  <>
                    <h2></h2>
                  </>
                ) : (
                  <Link to={`/donator/sendRequest/${id}`}>
                    <button class="btn btn-info">שלח בקשה</button>
                  </Link>
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

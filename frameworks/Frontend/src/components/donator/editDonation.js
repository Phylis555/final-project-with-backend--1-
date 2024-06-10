import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import swal from "sweetalert";
import LoadingSpinner from "../common/LoadingSpinner";
import { getAuthHeader } from "../common/authHeader";

export default function EditDonation() {
  const navigate = useNavigate();
  const [donationTitle, setDonationTitle] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [donationDescription, setDonationDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Fetch donation details when the component mounts
  useEffect(() => {
    const fetchDonationDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8070/donator/getOneDonation/${id}`, getAuthHeader());
        const donation = res.data.donation;
        // Set the state variables with the fetched data
        setDonationTitle(donation.donationTitle);
        setEmail(donation.email);
        setContactNumber("0" + donation.contactNumber);
        setDonationDescription(donation.donationDescription);
      } catch (error) {
        // Show an alert and navigate to the login page if the user is not authenticated
        console.error("Failed to fetch donation details:", error);
        swal({
          title: "Unauthorized",
          text: "Please Login First",
          icon: "warning",
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchDonationDetails();
  }, [id, navigate]);

    // Handle form submission to edit the donation
  const editDonation = async (e) => {
    setLoading(true);
    e.preventDefault();
    const donation = {
      donationTitle,
      email,
      contactNumber,
      donationDescription,
    };
    await axios
      .post(`http://localhost:8070/donator/updateDonation/${id}`, donation, getAuthHeader())
        .then((res) => {
        setLoading(false);
        swal("התרומה עודכנה בהצלחה", "", "success").then((value) => {
          if (value) {
            navigate("../dashboard");// Navigate to the dashboard after successful update
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
        <div dir="rtl">
           {/* Back button */}
        <i className="bi bi-arrow-left-circle fs-4 cursor-pointer me-3" onClick={() => navigate(-1)}>
          הקודם
        </i>
        {loading ? (
          // Show loading spinner while loading
          <div style={{ marginTop: 250 }}>
            <LoadingSpinner />
          </div>
        ) : (
            // Donation edit form
          <div className="container my-auto" style={{ paddingTop: 100 }} dir="rtl">
          <div className="row">
            <div className="mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-body">
                  <form role="form" className="text-start" onSubmit={editDonation}>
                    <div className="d-flex justify-content-center">
                      <h4>ערוך בקשה</h4>
                    </div>

                    <div className="input-group mb-3 input-group-outline">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="כותרת*"
                        aria-label="Donation Title"
                        value={donationTitle}
                        onChange={(e) => setDonationTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-group mb-3 input-group-outline">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="מספר טלפון של איש קשר*"
                        aria-label="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-group mb-3 input-group-outline">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email*"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-group mb-3 input-group-outline">
                      <textarea
                        className="form-control"
                        placeholder="תיאור אודות התרומה*"
                        aria-label="Donation Description"
                        rows="3"
                        value={donationDescription}
                        onChange={(e) => setDonationDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-warning">
                        ערוך תרומה
                      </button>
                    </div>
                  </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

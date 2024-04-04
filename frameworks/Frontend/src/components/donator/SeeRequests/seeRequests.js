import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getApprovedRequests,
  getOneDonation,
  getRequests,
} from "../../../api/donator.api";
import LoadingSpinner from "../../common/LoadingSpinner";
import NoItems from "../noItems";
import RequestCard from "./requestCard";
import jspdf from "jspdf";
import "jspdf-autotable";
import img from "./banner.png";

export default function SeeRequests() {
  const location = useLocation();
  const fromAccepted = location.state?.fromAccepted;
  console.log(location);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [donation, setDonation] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    if (fromAccepted) {
      getApprovedRequests(id)
        .then((res) => {
          setLoading(false);
          console.log("sd");
          console.log(res);
          if (res.data.length > 0) {
            setApprovedRequests(res.data);
            console.log(res.data);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    } else {
      getRequests(id)
        .then((res) => {
          setLoading(false);
          console.log(res);
          if (res.data.length > 0) {
            const approved = res.data.filter(request => request.requestStatus === 'accepted');
            const pending = res.data.filter(request => request.requestStatus !== 'accepted');
            setApprovedRequests(approved);
            setPendingRequests(pending);
            console.log(approved);
            console.log(pending);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getOneDonation(id)
      .then((res) => {
        setLoading(false);
        console.log("dsd");
        console.log(res);
        setDonation(res.data.donation);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const generateReport = (tickets) => {
    const doc = new jspdf();
    const tableColumn = [
      "Requester Name",
      "Requester Email",
      "Requester Contact",
      "Request Description",
    ];
    const tableRows = [];

    tickets.map((ticket) => {
      const ticketData = [
        ticket.requesterName,
        ticket.requesterEmail,
        ticket.requesterContact,
        ticket.requestDescription,
      ];
      tableRows.push(ticketData);
    });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    // right down width height
    doc.addImage(img, "PNG", 0, 0, 210, 38);

    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 8 },
      startY: 40,
    });

    // doc.text(, 14, 23).setFontSize(9);
    doc.save(`Donations_Requests-${donation.donationTitle}_${dateStr}.pdf`);
  };

  return (
    <div dir="rtl"
      style={{
        overflow: "hidden",
      }}
    >
      
      <h3
        style={{
          marginRight: 50,
          marginTop: 10,
          marginBottom: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        בקשות עבור תרומה - {donation.donationTitle}
      </h3>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            bottom: 0,
            left: 0,
            right: 0,

            margin: "auto",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger "
              onClick={() => generateReport([...approvedRequests, ...pendingRequests])}
            >
            יצירת דוח
            </button>
          </div>

          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pending-requests-tab"
                data-bs-toggle="tab"
                data-bs-target="#pending-requests"
                type="button"
                role="tab"
                aria-controls="pending-requests"
                aria-selected="true"
              >
              בקשות שלא אושרו עדיין
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link "
                id="approved-requests-tab"
                data-bs-toggle="tab"
                data-bs-target="#approved-requests"
                type="button"
                role="tab"
                aria-controls="approved-requests"
                aria-selected="false"
              >
              בקשות שאושרו
              </button>
            </li>
            
          </ul>
          <div className="tab-content my-3">
            <div
              className="tab-pane fade "
              id="approved-requests"
              role="tabpanel"
              aria-labelledby="approved-requests-tab"
            >
              {approvedRequests.length === 0 ? (
                <NoItems />
              ) : (
                <div
                  className="row row-cols-2"
                  style={{
                    marginLeft: 150,
                    overflow: "hidden",
                  }}
                >
                  {approvedRequests.map((request) => (
                    <div key={request._id} className="col">
                      <RequestCard
                        name={request.requesterName}
                        email={request.requesterEmail}
                        contact={request.requesterContact}
                        description={request.requestDescription}
                        id={request._id}
                        accepted={request.requestStatus}
                        title={donation.donationTitle}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="tab-pane fade show active"
              id="pending-requests"
              role="tabpanel"
              aria-labelledby="pending-requests-tab"
            >
              {pendingRequests.length === 0 ? (
                <NoItems />
              ) : (
                <div
                  className="row row-cols-2"
                  style={{
                    marginLeft: 150,
                    overflow: "hidden",
                  }}
                >
                  {pendingRequests.map((request) => (
                    <div key={request._id} className="col">
                      <RequestCard
                        name={request.requesterName}
                        email={request.requesterEmail}
                        contact={request.requesterContact}
                        description={request.requestDescription}
                        id={request._id}
                        accepted={request.requestStatus}
                        title={donation.donationTitle}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

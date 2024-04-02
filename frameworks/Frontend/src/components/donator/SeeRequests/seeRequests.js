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
  const [requests, setRequests] = useState([]);
  const [donation, setDonation] = useState([]);

  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    //fetching all inbound item data from the database
    if (fromAccepted) {
      getApprovedRequests(id)
        .then((res) => {
          setLoading(false);
          console.log("sd");
          console.log(res);
          if (res.data.length > 0) {
            setRequests(res.data);
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
            setRequests(res.data);
            console.log(res.data);
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
    //fetching all inbound item data from the database
    getOneDonation(id)
      .then((res) => {
        setLoading(false);
        console.log("dsd");
        console.log(res);

        setDonation(res.data.donation);
        // console.log(res.data);
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
      ) : requests.length == 0 ? (
        <h4
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          אין עדיין בקשות
        </h4>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger "
              onClick={() => generateReport(requests)}
            >
            יצירת דוח

            </button>
          </div>

          <div
            class="row row-cols-2"
            style={{
              marginLeft: 150,
              overflow: "hidden",
            }}
          >
            {requests.map(function (f) {
              return (
                <div>
                  <div class="col">
                    <RequestCard
                      name={f.requesterName}
                      email={f.requesterEmail}
                      contact={f.requesterContact}
                      description={f.requestDescription}
                      id={f._id}
                      accepted={fromAccepted}
                      title={donation.donationTitle}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

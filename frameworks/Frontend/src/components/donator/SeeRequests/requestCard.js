import React from "react";
import swal from "sweetalert";
import {
  acceptDonationRequest,
  rejectDonationRequest,
} from "../../../api/donator.api";
import { FaWhatsapp } from "react-icons/fa";

export default function RequestCard(props) {
  var reqdata = {
    email: props.email,
    title: props.title,
  };
  const acceptRequest = (id) => {
    swal({
      title: "אתה בטוח?",
      text: "הבקשה תאושר",
      icon: "warning",
      textDirection: "rtl",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        acceptDonationRequest(id, reqdata)
          .then((res) => {
            if (willDelete) {
              swal("הבקשה אושרה!!", {
                icon: "success",
              });
              setTimeout(function () {
                window.location.reload();
              }, 1000);
              console.log(res);
            }
            // } else {
            //               swal("File Is Not Deleted");
            //             }
          })
          .catch((e) => {
            swal("File Is Not Deleted");
          });
      }
    });
  };

  const rejectedRequest = (id) => {
    var reqdata = {
      email: props.email,
      title: props.title,
    };
    swal({
      title: "אתה בטוח?",
      text: "הבקשה תדחה",
      icon: "warning",
      textDirection: "rtl",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        rejectDonationRequest(id, reqdata)
          .then((res) => {
            if (willDelete) {
              swal("הבקשה נדחתה!!", {
                icon: "success",
              });
              setTimeout(function () {
                window.location.reload();
              }, 1000);
              console.log(res);
            }
            // } else {
            //               swal("File Is Not Deleted");
            //             }
          })
          .catch((e) => {
            swal("File Is Not Deleted");
          });
      }
    });
  };
  return (
    <>
      <div
        class="card z-index-0 fadeIn3 "
        style={{
          width: 500,
          height: "92%",
          maxHeight:500,
          marginBottom: 20,
          marginRight: 20,
        }}
      >
        <div class="card-body">
          
          <h4
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            פרטי הבקשה
          </h4>
          <div
            style={{
              marginRight: 40,
            }}
          >
            <h6>שם - {props.name}</h6>
            <h6>Email - {props.email}</h6>
            <h6>מספר איש קשר - {props.contact} 
            <a
              href={`https://wa.me/972${props.contact}?text=${encodeURIComponent("שלום, ראיתי את התרומה שלך דרך אתר Instant Giving ואני מעוניין בתרומה שהצעת! אשמח שתיצור איתי קשר. תודה רבה!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-success p-2 me-2 mt-2"
            >
            <FaWhatsapp className="ms-2 mb-1" /> שלח הודעה ב whatsapp
            </a>
            </h6> 
                    
            <h6>תיאור - {props.description}</h6>
            {props.items.length > 0 && (
              <h6>פריטים לתרומה:</h6>
            )}
            <ul className="list-group">
              {props.items.map((items, index) => (
                <li className="" key={index}>
                  <span>שם הפריט: {items.item.itemName}</span>
                  <span className="badge bg-light text-dark fs-7 me-3 m-1">כמות: {items.receivedAmount}</span>
                </li>
              ))}
            </ul>

          </div>
          {props.accepted === 'accepted' ? (
            <div
              class="d-flex justify-content-around"
              style={{
                marginTop: 20,
              }}
            >
          </div>
          ) : (
            <div
              class="d-flex justify-content-around"
              style={{
                marginTop: 20,
              }}
            >
              <button
                type="button"
                class="btn btn-success"
                onClick={() => {
                  acceptRequest(props.id, props.email, props.title);
                }}
              >
                אשר בקשה
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  rejectedRequest(props.id, props.email);
                }}
              >
                דחה בקשה
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

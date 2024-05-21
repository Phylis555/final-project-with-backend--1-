import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getAuthHeader } from "../../common/authHeader";

export default function RejectedDonationsCard(props) {

    // Function to handle the deletion of a donation item.
  const deleteDonation = (id) => {
    console.log(id);
    // Show confirmation dialog before deleting
    swal({
      title: "שים לב",
      text: "פריט לא היה זמין לאחר מחיקתו",
      icon: "warning",
      textDirection: "rtl",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Send delete request to backend
        axios
          .delete(`http://localhost:8070/donator/deleteDonation/${id}`,getAuthHeader())
          .then((res) => {
            if (willDelete) {
              // Show success message
              swal("הפריט נמחק בהצלחה", {
                icon: "success",
              });
              // Reload the page after deletion
              setTimeout(function () {
                window.location.reload();
              }, 1000);
              console.log(res);
            }
           
          })
          .catch((e) => {
           // Show error message if deletion fails
            swal("File Is Not Deleted");
          });
      }
    });
  };
  return (
    <div dir="rtl">
      <div className="courses-container">
        <div className="course">
          <div className="course-info">
            <div className="progress-container">
                {/* Delete button */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
              <span onClick={() => deleteDonation(props._id)}> מחק</span> <br />
          

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
              {/* Edit link */}
              <Link to={`/donator/dashboard/donator/editDonation/${props._id}`}>
                <span data-toggle="modal" data-target="#exampleModalCenter"> ערוך</span>
              </Link>
            </div>
              {/* Donation Title and Description */}
              <Link to={"/donator/view/" + props._id} style={{ color: "black" }}> <h2 className="card-title">{props.donationTitle}</h2> </Link>
              <h6>{props.donationDescription}</h6>
              <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

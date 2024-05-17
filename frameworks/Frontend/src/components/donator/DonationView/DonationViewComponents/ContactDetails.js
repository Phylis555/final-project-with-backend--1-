import React from "react";

export default function ContactDetails(props) {
  return (
    <>
      <div>

        {/* Title Section */}
        <div className="title" style={{ textAlign: "center"}}>
          <h5>פרטי יצירת קשר</h5> 
        </div>

        {/* Contact Information Section */}
        <div className="cont">
          <div className="row" style={{ marginBottom: 10}}>
            <div className="col-4">
              <span style={{ fontWeight: 1000}}>
                Email:
              </span>
            </div>
            <div className="col-7">
              <div>{props.email}</div> {/* Display the email passed via props */}
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <span style={{fontWeight: 1000}}>
                מספר טלפון:
              </span>
            </div>
            <div className="col-7">
              <div> {props.mobile}</div> {/* Display the mobile number passed via props */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

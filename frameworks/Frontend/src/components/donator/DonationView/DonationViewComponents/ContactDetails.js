import React from "react";

export default function ContactDetails(props) {
  return (
    <>
      <div className="">
        <div
          className="title"
          style={{
            textAlign: "center",
          }}
        >
          <h5>פרטי יצירת קשר</h5>
        </div>
        <div className="cont">
          {/* <div
            className="row"
            style={{
              marginBottom: 10,
            }}
          >
            <div className="col-2">
              <span
                style={{
                  fontWeight: 1000,
                }}
              >
                Name:
              </span>
            </div>
            <div className="col-9">
              <div>{props.name}</div>
            </div>
          </div> */}
          <div
            className="row"
            style={{
              marginBottom: 10,
            }}
          >
            <div className="col-4">
              <span
                style={{
                  fontWeight: 1000,
                }}
              >
                Email:
              </span>
            </div>
            <div className="col-7">
              <div>{props.email}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <span
                style={{
                  fontWeight: 1000,
                }}
              >
                מספר טלפון:
              </span>
            </div>
            <div className="col-7">
              <div> {props.mobile}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

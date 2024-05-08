import React from "react";

export default function DonationDescription(props) {
  return (
    <>
    <div className="">

      <div
        className="title"
        style={{
          textAlign: "center",
        }}
      >
        <h5>תיאור</h5>
      </div>
      <p>{props.description}</p>

      </div>

    </>
  );
}

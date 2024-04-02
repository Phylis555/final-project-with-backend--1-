import React from "react";
import "./css/noItems.css";

export default function NoItems() {
  return (
    <>
      <div class="d-flex justify-content-center">
        <div class="col-sm">
          <h4 className="noItemsHeader">אין נתונים זמינים</h4>
          <iframe src="https://embed.lottiefiles.com/animation/106840"></iframe>
        </div>
      </div>
    </>
  );
}

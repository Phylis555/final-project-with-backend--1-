import React from "react";
import "./noItems.css";
// A functional component that displays a message when no items are found.
export default function NoItems(props) {
  return (
    <>
      <div className="">
        <div className="col-sm mt-5">
          <h4 className="noItemsHeader">{props.message}</h4>
        </div>
      </div>
    </>
  );
}

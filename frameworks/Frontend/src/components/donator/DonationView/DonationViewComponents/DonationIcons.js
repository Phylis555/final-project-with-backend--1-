import React from "react";

export default function DonationIcon(props) {
  return (
    <>
      <div className="row" style={{ marginBottom: 30, marginTop: 20}}>
         {/* First column for location */}
        <div className="col">
          <div className="row" style={{paddingLeft: 20}}>
            <div className="col-1">
              {/* Icon for location */}
              <i className="material-icons opacity-10 " style={{ color: "green"}}>
                location_on
              </i>
            </div>
            <div className="col-11  ">{props.location}</div> {/* Display location from props */}
          </div>
        </div>

        {/* Second column for requests */}  
        <div className="col">
          <div className="row" style={{paddingLeft: 90}}>
            <div className="col-1" style={{ marginRight: 5 }}>
               {/* Icon for group */}
              <i className="material-icons opacity-10 " style={{color: "blue"}}>
                group
              </i>
            </div>

            <div className="col">{props.requests} תרומות</div> {/* Display number of requests from props */}
          </div>
        </div>

        {/* Third column for remaining time */}
        <div className="col">
          <div className="row" style={{paddingLeft: 100}}>
            <div className="col-1">
              <i className="material-icons opacity-10" style={{ color: "red"}}>
                schedule
              </i>
            </div>

            <div className="col">{props.remaining} נותרו</div> {/* Display remaining time from props */}
          </div>
        </div>
      </div>
    </>
  );
}

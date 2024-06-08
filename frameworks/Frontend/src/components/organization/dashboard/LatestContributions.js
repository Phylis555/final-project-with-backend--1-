import React, { useEffect, useState } from "react";
import { getOrgLatestContribution } from "../../../api/organization.api";

export default function LatestContributions({ organizationId, limit }) {
  const [latestContributions, setLatestContributions] = useState([]);

  useEffect(() => {
        // Fetch latest contributions when component mounts or organizationId or limit changes
    getOrgLatestContribution(organizationId, limit)
      .then((res) => {
        // Update the state with the latest contributions
        setLatestContributions(res.data.contributions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [organizationId, limit]);

  return (
    <div dir="rtl">
      <div className="card h-100">
        <div className="card-header pb-0">
          <h6>תרומות אחרונות</h6>
          {/* Display message if there are no contributions */}
          {latestContributions.length === 0 ? (
            <p className="text-sm">אין עדיין תרומות</p>
          ) : null}
        </div>
        <div className="card-body p-3">
          <div className="timeline timeline-one-side">
            {/* Map through the latest contributions */}
            {latestContributions.map((contribution, index) => (
              <div key={index}>
                <div className="timeline-block">
                  <span className="timeline-step">
                    {/* Icon for contribution */}
                    <i className="material-icons text-success text-gradient">
                      paid
                    </i>
                  </span>
                  <div className="timeline-content">
                    <div className="row">
                      {/* User ID */}
                      <h6 className="text-dark text-sm font-weight-bold mb-0 col-lg-8 col-md-7">
                        {contribution.userID}
                      </h6>
                      {/* Amount */}
                      <h6 className="text-dark text-sm font-weight-bold mb-0 col-lg-4 col-md-5">
                        {" "}
                        {contribution.amount} ש"ח
                      </h6>
                    </div>
                    {/* Date of contribution */}
                    <p className="text-secondary text-xs mt-1 mb-0">
                      {
                        new Date(contribution.donatedDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                  </div>
                </div>
                <hr className="dark horizontal my-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

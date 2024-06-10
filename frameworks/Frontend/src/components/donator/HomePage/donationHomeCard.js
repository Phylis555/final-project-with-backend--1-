import React from "react";
import { getRemainingTime } from '../../common/getRemainingTime';
import ProgressBar from "@ramonak/react-progress-bar";

export default function DonationHomeCard({donation}) {
    // Calculating the total received and total amount of the donation items
  const totalReceived = donation.wantedItems.reduce((acc, item) => acc + item.receivedAmount, 0);
  const totalAmount = donation.wantedItems.reduce((acc, item) => acc + item.wantedQuantity, 0);

  return (
    <div className="col col-lg-12 col-md-8 col-sm-8">
      <div className="don-card card mb-3 p-1 ">
        {/* Donation image */}
        <img
          src={donation.donationImage}
          className="card-img-top p-1 shadow border-radius-xl img-fluid card-image"
          alt="image"style={{maxHeight: 240,minHeight: 240,}}
        />
        <div className="card-body ">
          {/* Donation title */}
          <h5 className="card-title">{donation.donationTitle}</h5>
          {/* Donation description */}
          <p className="card-text py-0">
            {donation.donationDescription}
          </p>

          {/* Progress bar showing the percentage of total received items */}
          <div>
            {totalReceived > 0 ?  (
              <ProgressBar
                completed={Math.round(totalReceived / totalAmount * 100 ) }
                height="14px"
                className="px-0 pb-1"
                labelSize= {"10px"}
                labelColor="#FDE1FF"
                labelAlignment="center"
              />
            ) : (
              // Display an empty div if there are no received items
              <div style={{ height: "2px", marginBottom: "1rem" }}></div>
            )}
          </div>
          {/* Displaying donation details */}
          <div className='row d-flex text-dark text-center'>
            {/* Number of donors */}
            <div className='col-sm-3 col-md-4 fs-7'>
                <div>מספר תורמים</div>
                <h5 className='fs-7 '>{donation.numberOfRequests}</h5>
            </div>
            {/* Remaining time */}
            <div className='col-sm-4 col-md-4 fs-7'>
                <div>זמן שנותר</div>
                <h5 className='text-danger fs-7'>{getRemainingTime(donation.donationEndDate)}</h5>
            </div>
            {/* Creation date */}
            <div className='col-sm-4 col-md-4 fs-7'>
              <div>נוצר בתאריך</div>
              {
                  new Date(donation.donationStartDate).toISOString().split('T')[0]
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

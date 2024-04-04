import React from "react";
import { getRemainingTime } from '../../common/getRemainingTime';
import ProgressBar from "@ramonak/react-progress-bar";

export default function DonationHomeCard({donation}) {
  const totalReceived = donation.wantedItems.reduce((acc, item) => acc + item.receivedAmount, 0);
  const totalAmount = donation.wantedItems.reduce((acc, item) => acc + item.wantedQuantity, 0);

  return (
    <div class="col col-lg-14 ">
      <div
        className="card mb-3 p-1 "
        style={{
          height: 440,
          width:340,
          // height: 280,
          // marginBottom: 20,
        }}
      >
        <img
          src={donation.donationImage}
          className="card-img-top p-1 shadow border-radius-xl"
          alt="image"
          style={{
            maxHeight: 240,
            minHeight: 240,
            
          }}
        />
        <div class="card-body ">
          <h5 class="card-title">{donation.donationTitle}</h5>
          <p className="card-text py-0">
            {donation.donationDescription.split(" ").slice(0, 10).join(" ")}
            {donation.donationDescription.split(" ").length > 10 && "..."}
          </p>

          <div>
            {totalReceived > 0 &&  (
              <ProgressBar
                completed={Math.round(totalReceived / totalAmount * 100 * 100) / 100}
                height="12px"
                className="px-0 pb-1"
              />
            )}
          </div>

          <div className='row d-flex text-dark text-center'>
            <div className='col-sm-3 col-md-4 fs-7'>
                <div>מספר תורמים</div>
                <h5 className='fs-7 '>{donation.numberOfRequests}</h5>
            </div>
            <div className='col-sm-4 col-md-4 fs-7'>
                <div>זמן שנותר</div>
                <h5 className='text-danger fs-7'>{getRemainingTime(donation.donationEndDate)}</h5>
            </div>

            <div className='col-sm-4 col-md-4 fs-7'>
                {
                  <>
                    <div>נוצר בתאריך</div>
                    {
                        new Date(donation.donationStartDate).toISOString().split('T')[0]
                    }
                  </>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

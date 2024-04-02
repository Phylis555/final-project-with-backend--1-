import React from "react";
import { getRemainingTime } from '../../common/getRemainingTime';

export default function DonationHomeCard({donation}) {
  return (
    <div class="col col-lg-14 ">
      <div
        className="card mb-3 p-2 "
        style={{
          height: 340,
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
            maxHeight: 180,
            minHeight: 140,
          }}
        />
        <div class="card-body ">
          <h5 class="card-title">{donation.donationTitle}</h5>
          <p class="card-text">{donation.donationDescription}</p>
          
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

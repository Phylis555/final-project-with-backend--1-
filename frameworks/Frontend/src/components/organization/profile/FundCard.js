import React from 'react'
import { Link } from 'react-router-dom'

export default function FundCard({ fundraising }) {
    return (
        <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
            <div className="card card-blog card-plain">
                <div className="card-header p-0 mt-n4 mx-3">
                    {/* Fundraising image */}
                    <a className="d-block shadow-xl border-radius-xl">
                        <img src={fundraising.fundImage} alt="img-blur-shadow" style={{maxHeight: 140,minHeight: 140,}} 
                        className="card-img-top p-1 shadow border-radius-xl img-fluid card-image"/>
                    </a>
                </div>
                {/* Card body */}
                <div className="card-body card-title p-3">
                    <h5>{fundraising.title}</h5>
                    <p className="mb-4 card-text text-sm">
                        {fundraising.target}
                    </p>
                     {/* Button to view fundraising details */}
                    <div className="d-flex align-items-center justify-content-between">
                        <Link to={`/fund/${fundraising._id}`} className="btn text-primary btn-sm mb-0">צפה בגיוס תרומות</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

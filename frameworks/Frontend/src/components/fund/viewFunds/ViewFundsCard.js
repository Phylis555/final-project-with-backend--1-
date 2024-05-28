import React from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../../common/getCookie';
import { getRemainingTime } from '../../common/getRemainingTime';
import ProgressBar from "@ramonak/react-progress-bar";


export default function ViewFundsCard({ fund }) {
    return (
        <div className='col col-xxl-6 col-xl-6 col-lg-10  col-md-12 col-sm-12 h-100' dir="rtl">
        <div className="card mb-3">
            <div className="row g-0 row-cols-md-4">
                {/* Fund Image */}
                <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-3 p-2">
                    <Link to={`/fund/${fund._id}`} className="disable-hover-color">
                        <img src={fund.fundImage} className="img-fluid card-image shadow border-radius-xl" style={{maxHeight: 200,minHeight: 200,}} alt={fund.title} />
                    </Link>
                </div>
                {/* Fund Details */}
                <div className="col-md-8">
                        <div className="card-body">
                            <div className="progress-container">
                                {/* Edit Button */}                               
                                <div className='btn text-danger p-1'>
                                    {(fund.status === "pending" || fund.status === "approved") && fund.organizationID === getCookie("uId") && (
                                        <Link to={`/fund/editFund`} state={fund}>
                                            עריכה
                                        </Link>
                                    )}
                                </div>
                            </div>
                             {/* Fund Title */}
                            <div className="d-flex">
                                <Link to={`/fund/${fund._id}`} className="disable-hover-color">
                                    <h5 className="card-title p-1">{fund.title}</h5>
                                </Link> 
                               
                            </div>
                            {/* Fund Target */}
                            <p className="card-title">
                                {fund.target}
                            </p>
                            {/* Fund Progress Bar */}
                            <div>
                                <ProgressBar
                                    completed={Math.round(fund.currentAmount / fund.budget * 100)}
                                    labelSize={"10px"}
                                    labelColor="#FDE1FF"
                                />
                            </div>
                            {/* Fund Details */}
                                <div className='row d-flex'>
                                     {/* Budget */}
                                    <div className='col-sm-6 col-md-4'>
                                        <div>סכום</div>
                                        <h6>₪ {fund.budget}</h6>
                                    </div>
                                    {/* Remaining Time or Status */}
                                    {fund.status === "approved" ? (
                                        // Display remaining time if status is approved
                                            <div className='col-sm-6 col-md-4 '>
                                                <div>זמן שנותר</div>
                                                <h6 className='text-danger '>{getRemainingTime(fund.endingDate)}</h6>
                                            </div>
                                        ) : (
                                             // Display status otherwise
                                            <div className='col-sm-6 col-md-4'>
                                                <div>סטטוס</div>
                                                {
                                                    fund.status === "completed" ? (
                                                        <h6 className='text-success'>הושלם</h6>
                                                    ) : (
                                                        fund.status === "pending" ?
                                                            (<h6 className='text-info text-capitalize'>בהמתנה </h6>) :
                                                            (<h6 className='text-danger text-capitalize'>{fund.status}</h6>)
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {/* Completion Date */}
                                    <div className='col-sm-6 col-md-4 fs-7'>
                                        { fund.status === "completed" ? (
                                                <>
                                                    <div>הסתיים בתאריך</div>
                                                    {new Date(fund.endingDate).toISOString().split('T')[0]}
                                                </>
                                            ) : (
                                                <>
                                                    <div>נוצר בתאריך</div>
                                                    {new Date(fund.createdOn).toISOString().split('T')[0]}
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

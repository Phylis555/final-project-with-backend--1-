import React from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../../common/getCookie';
import { getRemainingTime } from '../../common/getRemainingTime';
import ProgressBar from "@ramonak/react-progress-bar";


export default function ViewFundsCard({ fund }) {
    return (
        <div className='col-xxl-6 col-lg-8 col-lg-10 col-sm-12 h-100' dir="rtl"
        >
            <Link to={`/fund/${fund._id}`} className="disable-hover-color">
                <div className="card mb-3">
                    <div className="row g-0 row-cols-md-4">
                        <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-3 p-2">
                            <img src={fund.fundImage} className="img-fluid card-image shadow border-radius-xl" alt={fund.title} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="d-flex">
                                    <h5 className="card-title p-2 flex-grow-1">{fund.title}</h5>
                                    <div className='btn text-danger p-2'>
                                        {
                                            (fund.status === "pending" || fund.status === "approved") && fund.organizationID === getCookie("uId") ?
                                                (
                                                    <Link to={`/fund/editFund`} state={fund} >
                                                        <div className="material-icons opacity-10 d-inline-block"></div>
                                                        עריכה
                                                    </Link>
                                                ) : null
                                        }
                                    </div>
                                </div>
                                <p className="card-text">
                                    {fund.target.split(" ").slice(0, 8).join(" ")}
                                    {fund.target.split(" ").length > 8 && "..."}
                                </p>
            
                                <div>
                                    <ProgressBar
                                        completed={Math.round(fund.currentAmount / fund.budget * 100 * 100) / 100} // rounded to 2 decimal places
                                        labelSize= {"10px"}/>
                                </div>
                                <div className='row d-flex'>
                                    <div className='col-sm-6 col-md-4'>
                                        <div>סכום</div>
                                        <h5>₪ {fund.budget}</h5>
                                    </div>
                                    {
                                        fund.status === "approved" ? (
                                            <div className='col-sm-6 col-md-4'>
                                                <div>זמן שנותר</div>
                                                <h5 className='text-danger '>{getRemainingTime(fund.endingDate)}</h5>
                                            </div>
                                        ) : (
                                            <div className='col-sm-6 col-md-4'>
                                                <div>סטטוס</div>
                                                {
                                                    fund.status === "completed" ? (
                                                        <h5 className='text-success'>הושלם</h5>
                                                    ) : (
                                                        fund.status === "pending" ?
                                                            (<h5 className='text-info text-capitalize'>{fund.status}</h5>) :
                                                            (<h5 className='text-danger text-capitalize'>{fund.status}</h5>)
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    <div className='col-sm-6 col-md-4'>
                                        {
                                            fund.status === "completed" ? (
                                                <>
                                                    <div>הסתיים בתאריך</div>
                                                    {new Date(fund.completedOn).toISOString().split('T')[0]}
                                                </>
                                            ) : (
                                                <>
                                                    <div>נוצר בתאריך</div>
                                                    {
                                                        new Date(fund.createdOn).toISOString().split('T')[0]
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

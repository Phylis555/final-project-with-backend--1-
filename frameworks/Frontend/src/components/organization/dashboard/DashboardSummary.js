import React, { useEffect, useState } from 'react'
import { getOrgDashSummary } from '../../../api/organization.api'

export default function DashboardSummary({ organizationId }) {
    // State to hold the summary data
    const [summary, setSummary] = useState({})

    // Fetch summary data when organizationId changes
    useEffect(() => {
        // Fetch summary data from the API
        getOrgDashSummary(organizationId)
            .then(res => {
                setSummary(res.data.summary)
            }).catch(err => {
                console.log(err)
            })
    }, [organizationId])

    return (
        <div>
            <div className="row" >
                 {/* Display summary cards */}
                <div className="row">
                    {/* Card: Total Funds Amount */}
                    <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="p-3 pt-2">
                                <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                                    <i className="material-icons opacity-10">attach_money</i>
                                </div>
                                <div className="text-end pt-1" dir="rtl">
                                    <p className="text-sm mb-0 text-capitalize">סכום שנצבר</p>
                                    <h4 className="mb-0">{summary.totalFundsAmount} ש"ח </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card: Active Funds */}
                    <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                        <div className="card ">
                            <div className=" p-3 pt-2">
                                <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                                    <i className="material-icons opacity-10">volunteer_activism</i>
                                </div>
                                <div className="text-end pt-1">
                                    <p className="text-sm mb-0 text-capitalize">גיוסי כספים פעילים</p>
                                    <h4 className="mb-0">{summary.activeFunds}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card: Total Donors */}
                    <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className=" p-3 pt-2">
                                <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                                    <i className="material-icons opacity-10">diversity_1</i>
                                </div>
                                <div className="text-end pt-1">
                                    <p className="text-sm mb-0 text-capitalize">מספר תורמים</p>
                                    <h4 className="mb-0">{summary.totalDonors}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

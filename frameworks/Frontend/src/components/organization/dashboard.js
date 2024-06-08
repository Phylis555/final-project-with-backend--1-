import React, { useEffect, useState } from "react";
import FundraisingChart from "./dashboard/FundraisingChart";
import LatestContributions from "./dashboard/LatestContributions";
import DashboardSummary from "./dashboard/DashboardSummary";
import NewFundraisings from "./profile/NewFundraisings";
import { getCookie } from "../common/getCookie";
import { toggleSidenav } from "../common/toggleSidenav";

export default function Dashboard() {
    const [organizationId, setOrganizationId] = useState();

    // Fetch the organization ID from cookies
    useEffect(() => {
        setOrganizationId(getCookie("uId"))
    }, []);

    return (
        <>
            {
                organizationId ? (
                    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                        <div className="container-fluid py-4 " onClick={toggleSidenav}>
                        <hr className="dark horizontal mb-4" />

                            {/* Dashboard summary */}
                            <DashboardSummary organizationId={organizationId} />
                            <hr className="dark horizontal my-3" />
                            <div className="row mt-3">
                                <div className="col-lg-4 col-md-6 my-4">
                                    {/* Latest contributions */}
                                    <LatestContributions organizationId={organizationId} limit={7} />
                                </div>
                                {/* Fundraising chart */}
                                <div className="col-lg-8 col-md-6 my-4">
                                    <FundraisingChart organizationId={organizationId} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="card">
                                    {/* New fundraisings */}
                                    <NewFundraisings limit={4} organizationId={organizationId} />
                                </div>
                            </div>
                        </div>
                    </main>) : null
            }
        </>
    )
}
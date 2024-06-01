import React from 'react'
import { Link } from 'react-router-dom';
import { toggleSidenav } from '../../common/toggleSidenav';
// import NavButton from '../../NavButton'
import CompletedFunds from './CompletedFunds';
import OngoingFunds from './OngoingFunds';
import PendingFunds from './PendingFunds';

export default function OrganizationFunds(props) {

    return (
    
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
            {/* Navigation button */}
            {/* <NavButton page="Funds" path="Organization" /> */}

            <div className="container-fluid py-3 " onClick={toggleSidenav}>
                {/* Button to create new fund */}
                <Link to="/fund/new" className="btn btn-primary mb-3">צור בקשה חדשה לתרומה</Link>
                <div className="card-body">
                    <ul className="nav nav-tabs"  id="fundTabs" role="tablist">
                            {/* Ongoing funds tab */}
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#ongoingFunds"
                                type="button"
                                role="tab"
                                aria-controls="ongoingFunds"
                                aria-selected="false">
                                פעיל
                            </button>
                        </li>
                        {/* Completed funds tab */}
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#completedFunds"
                                type="button"
                                role="tab"
                                aria-controls="completedFunds"
                                aria-selected="true">
                                הושלם
                            </button>
                        </li>
                        {/* Pending funds tab */}
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="pending-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#pendingFunds"
                                type="button"
                                role="tab"
                                aria-controls="pendingFunds"
                                aria-selected="true">
                                בהמתנה
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                            {/* Ongoing funds content */}
                        <div  className="tab-pane show active" id="ongoingFunds" role="tabpanel" aria-labelledby="ongoind-tab">
                            <OngoingFunds organizationID={props.organizationID} />
                        </div>
                        {/* Completed funds content */}
                        <div className="tab-pane" id="completedFunds" role="tabpanel" aria-labelledby="complete-tab">
                            <CompletedFunds organizationID={props.organizationID} />
                        </div>
                        {/* Pending funds content */}
                        <div className="tab-pane" id="pendingFunds" role="tabpanel" aria-labelledby="pending-tab">
                            <PendingFunds organizationID={props.organizationID} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

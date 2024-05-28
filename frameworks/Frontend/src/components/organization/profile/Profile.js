import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getOrganizationByID } from '../../../api/organization.api';
import { getCookie } from '../../common/getCookie';
import { toggleSidenav } from '../../common/toggleSidenav';
import NavButton from '../../NavButton';
import LatestContributions from "../dashboard/LatestContributions";
import NewFundraisings from './NewFundraisings';
import ChangePassoword from './ChangePassoword';
import UpdateBoardInfo from './UpdateBoardInfo';
import UpdateOrgInfo from './UpdateOrgInfo';

export default function Profile() {
    const params = useParams();
    const [updateData, setUpdateData] = useState(false);
    const [organizationID, setOrganizationID] = useState();
    const [organization, setOrganization] = useState({ registrationDate: "2024-09-27T12:20:02.029+00:00" });

    useEffect(() => {
        // Set organization ID from params or cookie
        if (params.organizationID) {
            setOrganizationID(params.organizationID);
        } else {
            setOrganizationID(getCookie("uId"));
        }
    }, [organizationID, params.organizationID]);

    // Fetch organization data
    useEffect(() => {
        if (organizationID !== undefined) {
            getOrganizationByID(organizationID)
                .then((res) => {
                    setOrganization(res.data.organization);
                }).catch((err) => {
                    console.log(err);
                })
            setUpdateData(false);
        }
    }, [organizationID, updateData]);

    return (
        <>
            {organizationID ? (
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
                    {/* Render NavButton if viewing own profile */}
                    {organizationID === getCookie("uId") ? (<NavButton page="Profile" path="Organization" />) : null}
                    <div className="container-fluid py-4 " onClick={toggleSidenav}>
                        <div className="card card-body">
                            <div className="row gx-4 mb-2">
                                <div className="col-auto">
                                    <div className="avatar avatar-xl position-relative">
                                        <i className="material-icons fs-1 position-relative text-secondary">apartment</i>
                                    </div>
                                </div>
                                {/* Organization name and type */}
                                <div className="col-auto my-auto">
                                    <div className="h-100">
                                        <h5 className="mb-1"> {organization.name}</h5>
                                        <p className="mb-0 font-weight-normal text-sm"> ארגון</p>
                                    </div>
                                </div> 
                                {/* Change Password buttons */}
                                { organizationID === getCookie("uId") ? (
                                    <div className="col-lg-2 col-sm-3 my-sm-auto me-sm-auto ms-sm-0 mx-auto mt-3">
                                        <div className="nav-wrapper position-relative start-0">
                                            <ul className="nav nav-pills nav-fill p-1" role="tablist">
                                                <li className="nav-item">
                                                    <Link className="nav-link mb-0 px-0 py-1 text-primary" to="#">
                                                        <button className="btn btn-secondary m-0"
                                                            type="button" data-bs-toggle="modal" data-bs-target="#passModel"
                                                        >שינוי סיסמה</button>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    ) : null
                                }
                            </div>
                            {/* Organization details */}
                            <div className="row">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-xl-4">
                                        <div className="card card-plain h-100">
                                            <div className="card-header pb-0 p-3">
                                                <div className="row">
                                                    <div className="col-md-8 d-flex align-items-center">
                                                        <h6 className="mb-0 fs-5">מידע על הארגון</h6>
                                                    </div>
                                                    { organizationID === getCookie("uId") ? (
                                                        <div className="col-md-4 text-end">
                                                            <Link to="#" data-bs-toggle="modal" data-bs-target="#orgModel">
                                                                <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>
                                                            </Link>
                                                        </div>
                                                        ) : null
                                                    }
                                                </div>
                                            </div>
                                            <hr className="horizontal full-dark m-0" />
                                            <div className="card-body p-3">
                                                <ul className="list-group">
                                                    <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">שם:</strong> &nbsp; {organization.name}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">כתובת:</strong> &nbsp; {organization.address}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">מדינה:</strong> &nbsp; {organization.country}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">מיקוד:</strong> &nbsp; {organization.zipCode}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">מייל:</strong> &nbsp; {organization.email}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">מספר איש קשר:</strong> &nbsp; {organization.contactNumber}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">מספר ארגון:</strong> &nbsp; {organization.registrationNumber}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">תאריך רישום:</strong> &nbsp; {new Date(organization.registrationDate).toISOString().split('T')[0]}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-xl-4">
                                        <div className="card card-plain h-100">
                                            <div className="card-header pb-0 p-3">
                                                <div className="row">
                                                    <div className="col-md-8 d-flex align-items-center">
                                                        <h6 className="mb-0 fs-5">פרטי הנהלת הארגון</h6>
                                                    </div>
                                                    { organizationID === getCookie("uId") ? (
                                                        <div className="col-md-4 text-end">
                                                            <Link to="#" data-bs-toggle="modal" data-bs-target="#memberModel">
                                                                <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>
                                                            </Link>
                                                        </div>
                                                    ) : null
                                                    }
                                                </div>
                                            </div>
                                            <hr className="horizontal full-dark m-0" />
                                            <div className="card-body p-3">
                                                <ul className="list-group">
                                                    <li className="list-group-item border-0 ps-0 pt-0 text-sm"><h6 className="mb-0 fs-6">פרטי מנהל הארגון</h6></li>
                                                    <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">שם:</strong> &nbsp; {organization.presidentName}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">טלפון:</strong> &nbsp; {organization.presidentContactNumber}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">מייל:</strong> &nbsp; {organization.presidentEmail}</li>
                                                    <li className="list-group-item border-0 ps-0 pt-0 text-sm mt-3"><h6 className="mb-0 fs-6">מזכירות הארגון</h6></li>
                                                    <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">שם:</strong> &nbsp; {organization.secretaryName}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">טלפון:</strong> &nbsp; {organization.secretaryContactNumber}</li>
                                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">מייל:</strong> &nbsp; {organization.secretaryEmail}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="card card-plain h-100">
                                            <LatestContributions organizationId={organizationID} limit={5} />
                                        </div>
                                    </div>
                                    <NewFundraisings limit={4} organizationId={organizationID} />
                                </div>
                            </div>
                        </div>

                        { organizationID === getCookie("uId") ? (
                                <>
                                    {/* Password change */}
                                    <div className="modal " id="passModel" tabIndex="-1" aria-labelledby="passModel" aria-hidden="true" data-bs-backdrop="static">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">שינוי סיסמה</h4>
                                                    <button
                                                        type="button" className="btn fs-4" data-bs-dismiss="modal" aria-label="Close"
                                                    >&times;</button>
                                                </div>
                                                <div className="modal-body">
                                                    <ChangePassoword organizationId={organizationID} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Board member details change */}
                                    <div className="modal " id="memberModel" tabIndex="-1" aria-labelledby="memberModel" aria-hidden="true" data-bs-backdrop="static">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">פרטי הנהלת הארגון</h4>
                                                    <button
                                                        onClick={
                                                            (e) => {
                                                                e.preventDefault();
                                                                setUpdateData(true)
                                                            }
                                                        }
                                                        type="button" className="btn fs-4" data-bs-dismiss="modal" aria-label="Close"
                                                    >&times;</button>
                                                </div>
                                                <div className="modal-body">
                                                    <UpdateBoardInfo organizationId={organizationID} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Organization details change */}
                                    <div className="modal " id="orgModel" tabIndex="-1" aria-labelledby="orgModel" aria-hidden="true" data-bs-backdrop="static">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">מידע על הארגון</h4>
                                                    <button
                                                        onClick={
                                                            (e) => {
                                                                e.preventDefault();
                                                                setUpdateData(true)
                                                            }
                                                        }
                                                        type="button" className="btn fs-4" data-bs-dismiss="modal" aria-label="Close"
                                                    >&times;</button>
                                                </div>
                                                <div className="modal-body">
                                                    <UpdateOrgInfo organizationId={organizationID} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null
                        }   
                    </div>
                </main>) : null
            }
        </>
    )
}

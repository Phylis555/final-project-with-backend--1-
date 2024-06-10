import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/dashboard.css";

export default function SideNav(props) {
    const navigate = useNavigate()
    // Function to log out the user and clear cookies
    const logOut = (e) => {
        e.preventDefault();
        // Clear cookies
        document.cookie = "uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect to sign-in page
        navigate("/user/signin");
    };

    return (
        <>
            <aside dir="rtl" className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start me-3 bg-gradient-dark" id="sidenav-main">
                <div className="sidenav-header">
                    <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <a className="navbar-brand m-0" href="/organization/dashboard">
                        <img src="/assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
                        <span className="ms-1 font-weight-bold text-white">לוח מעקב - ארגונים</span>
                    </a>
                </div>
                <hr className="horizontal light mt-0 mb-2" />
                <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                         {/* Dashboard Link */}
                         <li className="nav-item">
                        <Link className={`nav-link text-white ${props.dashboard ? 'active bg-gradient-primary' : ''}`} to="/organization/dashboard">
                            <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">dashboard</i>
                            </div>
                            <span className="nav-link-text ms-1">ראשי</span>
                        </Link>
                    </li>
                         {/* Funds Link */}
                    <li className="nav-item">
                        <Link className={`nav-link text-white ${props.fund ? 'active bg-gradient-primary' : ''}`} to="/organization/funds">
                            <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">table_view</i>
                            </div>
                            <span className="nav-link-text ms-1">תרומות</span>
                        </Link>
                    </li>
                        {/* Profile Link */}
                    <li className="nav-item">
                        <Link className={`nav-link text-white ${props.profile ? 'active bg-gradient-primary' : ''}`} to="/organization/profile">
                            <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">person</i>
                            </div>
                            <span className="nav-link-text ms-1">פרופיל</span>
                        </Link>
                    </li>
                    </ul>
                </div>
                {/* Logout Button */}
                <div className="sidenav-footer position-absolute w-100 bottom-0 ">
                    <div className="mx-3">
                        <Link onClick={logOut} className="btn bg-gradient-primary mt-4 w-100" to="#" type="button">התנתק</Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
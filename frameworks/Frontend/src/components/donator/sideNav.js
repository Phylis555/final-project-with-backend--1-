import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/dashboard.css";

export default function SideNav(props) {
  return (
    <>
      <aside dir="rtl"
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start me-3   bg-gradient-dark"
        id="sidenav-main"
      >
        <div className="sidenav-header" dir="rtl">
        <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          {/*  logo and name */}
          <a className="navbar-brand m-0" href="/donator/dashboard">
            <img src="/assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
            <span className="me-2 font-weight-bold text-white">
              לוח מעקב - תורמים
            </span>
          </a>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
          <ul className="navbar-nav">
            {/* Dashboard link */}
            <li className="nav-item">
                <Link className={`nav-link text-white ${props.dashboard && "active bg-gradient-primary"}`} to="/donator/dashboard">
                <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">ראשי</span>
              </Link>
            </li>
            {/* My Donations link */}
            <li className="nav-item">
              <Link className={`nav-link text-white ${props.myDonations && "active bg-gradient-primary"}`} to="/donator/myDonations">
                <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">התרומות שלי</span>
              </Link>
            </li>
            {/* Pending Donations link */}
            <li className="nav-item">
              <Link className={`nav-link text-white ${props.pending && "active bg-gradient-primary"}`} to="/donator/pendingDonations">
                <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">receipt_long</i>
                </div>
                <span className="nav-link-text ms-1">תרומות בהמתנה</span>
              </Link>
            </li>
            {/* Rejected Donations link */}
            <li className="nav-item">
              <Link className={`nav-link text-white ${props.rejected && "active bg-gradient-primary"}`} to="/donator/rejectedDonations">
                <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">receipt_long</i>
                </div>
                <span className="nav-link-text ms-1">תרומות שנדחו</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Footer */}
        <div className="sidenav-footer position-absolute w-100 bottom-0">
          <div className="mx-3">
            {/* Home button */}
            <a className="btn bg-gradient-primary mt-4 w-100" href="/">דף הבית</a>
          </div>
        </div>
      </aside>
          
    </>
  );
}

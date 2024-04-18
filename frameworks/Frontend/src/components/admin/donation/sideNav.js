// import React from "react";
// import "../../../assets/css/dashboard.css";
// import { Link, useNavigate } from "react-router-dom";

// export default function SideNav() {
//     const navigate = useNavigate()

//     const logOut = (e) => {
//         e.preventDefault();
//         document.cookie = "uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         document.cookie = "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         navigate("/user/signin");
//     };
//         return (
//             <>
//                 <aside dir="rtl" className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start me-3 bg-gradient-dark" id="sidenav-main" >
//                 <div className="sidenav-header" dir="rtl">
//                     <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
//                     <a className="navbar-brand m-0" href="/admin/dashboard">
//                         <img src="/assets/img/logo-ct.png" className="navbar-brand-img h-100 ms-2" alt="main_logo" />
//                             <span className="ms-1 font-weight-bold text-white">מנהל מערכת</span>
//                         </a>
//                     </div>
//                     <hr className="horizontal light mt-0 mb-2" />
//                     <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <a className="nav-link text-white " href="http://localhost:3000/admin/dashboard">
//                                     <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
//                                         <i className="material-icons opacity-10">dashboard</i>
//                                     </div>
//                                     <span className="nav-link-text ms-1">ראשי</span>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white " href="http://localhost:3000/admin/regorglist">
//                                     <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
//                                         <i className="material-icons opacity-10">table_view</i>
//                                     </div>
//                                     <span className="nav-link-text ms-1">ארגונים</span>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white " href="http://localhost:3000/admin/regfund">
//                                     <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
//                                         <i className="material-icons opacity-10">table_view</i>
//                                     </div>
//                                     <span className="nav-link-text ms-1">גיוסי כספים</span>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white active bg-gradient-primary" href="http://localhost:3000/admin/accepteddon">
//                                     <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
//                                         <i className="material-icons opacity-10">receipt_long</i>
//                                     </div>
//                                     <span className="nav-link-text ms-1">תרומות ציוד</span>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white " href="../pages/billing.html">
//                                     <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
//                                         <i className="material-icons opacity-10">receipt_long</i>
//                                     </div>
//                                     <span className="nav-link-text ms-1">משתמשים</span>
//                                 </a>
//                             </li>
                         
//                             <li className="nav-item">
//                                 <a className="nav-link text-white " href="../pages/profile.html">
//                                     <div className="text-white text-center ms-2 d-flex align-items-center justify-content-center">
//                                         <i className="material-icons opacity-10">person</i>
//                                     </div>
//                                     <span className="nav-link-text ms-1">פרופיל</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="sidenav-footer position-absolute w-100 bottom-0 ">
//                         <div className="mx-3">
//                             <Link onClick={logOut} className="btn bg-gradient-primary mt-4 w-100" to="#" type="button">התנתק</Link>
//                         </div>
//                     </div>
//                 </aside>
//             </>
//         );
//     }
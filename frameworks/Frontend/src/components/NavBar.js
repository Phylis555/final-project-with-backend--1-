import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo-nav.png";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "./common/getCookie";
import { getUserDonations } from "../api/donator.api";

export default function NavBar() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate()
  const [showDonations, setShowDonations] = useState(false);

    // Fetch the user ID from cookies when the component
  useEffect(() => {
    setUserId(getCookie("uId"));
}, []);

  // Fetch user donations when the user ID changes
  useEffect(() => {
    if (userId) {
      getUserDonations(userId)
        .then((donations) => {
          setShowDonations(donations.length > 0);
        })
        .catch((e) => console.log(e));
    } else {
      setShowDonations(false);
    }
  }, [userId]);


  // Handle user logout
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
    <div >
      <div id="navbar_top" className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="nav-link active" aria-current="page" href="/">
            <img className="img-navbar" src={Logo} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                  ראשי
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/fund/all">
                  גיוס כספים לעמותות
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/donator/home">
                   בקשות לתרומת ציוד
                </Link>
              </li>
              
              {userId ? (
                <li className="nav-item dropdown mx-4" dir="rtl">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  פרופיל
                </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                    {setShowDonations ? (
                      <li>
                         <Link className="dropdown-item" to="/donator/dashboard">
                          הבקשות ציוד שלי
                        </Link>
                      </li>
                    ) : (
                      <li>
                       <Link className="dropdown-item" to="/donator/createDonation">
                          צור תרומה
                        </Link>
                      </li>
                    )}
                    
                    <li>
                      <Link className="dropdown-item" to={`/user/profile/${userId}`}>
                        הגדרות חשבון
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={logOut}>
                        התנתק
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item ms-4">
                  <Link className="nav-link" to="/user/signin">
                    התחבר
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

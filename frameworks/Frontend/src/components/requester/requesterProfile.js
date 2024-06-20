import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Footer from '../Footer'
import NavBar from '../NavBar'
import Profile from './profile.png';
import "./footer.css"
import { requesterProfile } from '../../api/requester.api';

export default function RequesterProfile() {

    const { userId } = useParams();
    const [profileData, setProfileData] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    requesterProfile(userId)
      .then((res) => {
        setProfileData(res.data.requester);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <nav>
         {/* Navigation bar */}
        <NavBar />
      </nav>
      <div className='container' dir="rtl">
        <h4 className="pt-3 ms-4">הגדרות חשבון</h4>
        <hr className='hr-request-fund mx-4'/>
        <div className="container d-flex justify-content-center pt-4 pb-5">
          <div className="card z-index-0 fadeIn3 fadeInBottom ">
            < div className="card-body">
              <form className="form-control form-profile m-3">
                <div className="row pt-4"> 
                  <div className="d-flex justify-content-center ps-2 ms-2"> 
                      {/* Profile image */}
                    <img className='profile-image' src={Profile} />
                  </div> 
                </div>
                {/* Profile information fields */}
                <div className="row m-auto pt-5">
                  <div className="col ms-2 pe-5 ">
                    <div className="row">
                      <div className="col">
                        <div className="row input-group input-group-outline mb-4">
                          <label htmlFor="firstName">שם פרטי</label> 
                          <input 
                            type="text" 
                            id="firstName"
                            className="form-control"
                            defaultValue={profileData.firstName}
                            readOnly
                          /> 
                        </div> 
                      </div>

                      <div className="col">
                        <div className="row input-group input-group-outline mb-4"> 
                          <label htmlFor="lastName">שם משפחה</label>
                          <input 
                            type="text" 
                            id="lastName"
                            className="form-control"
                            defaultValue={profileData.lastName}
                            readOnly
                         /> 
                        </div>
                      </div>
                    </div>

                    <div className="row input-group input-group-outline mb-4">
                      <label htmlFor="contactNumber">מספר טלפון</label>
                      <input 
                        type="text" 
                        id="contactNumber"
                        className="form-control"
                        value={"0"+profileData.contactNumber}
                        readOnly
                      /> 
                    </div>

                    <div className="row input-group input-group-outline mb-4"> 
                      <label htmlFor="email" >מייל</label>
                      <input type="email" 
                        id="email"
                        className="form-control"
                        defaultValue={profileData.email}
                        readOnly
                      /> 
                    </div>
                  </div>
                </div>
                {/* Edit profile and change password button */}
                <div className="row pt-5"> 
                  <div className="mb-4 d-flex justify-content-center"> 
                    <Link to={`/user/profile/update/${userId}`} key={userId}>
                      <button className="btn btn-primary d-block px-5"> ערוך פרופיל / שינוי סיסמה </button>
                    </Link>
                  </div> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

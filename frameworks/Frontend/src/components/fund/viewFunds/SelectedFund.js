import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getFundByID, removeFund } from '../../../api/fund.api';
import { getOrganizationByID } from '../../../api/organization.api';
import ProgressBar from "@ramonak/react-progress-bar";
import { getRemainingTime } from '../../common/getRemainingTime';
import LoadingSpinner from '../../common/LoadingSpinner';
import { getCookie } from '../../common/getCookie';
import swal from "sweetalert";
import NavBar from '../../NavBar';
import DonateFund from './DonateFund';
import { toggleSidenav } from '../../common/toggleSidenav';

export default function SelectedFund() {
  // State variables to manage fund, organization, and loading status
  const [fund, setFund] = useState({ organizationID: "", endingDate: "2024-09-27T12:20:02.029+00:00" });
  const [organization, setOrganization] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const { fundID } = useParams();
  const navigate = useNavigate()

  // Fetch fund data by ID
  useEffect(() => {
    getFundByID(fundID)
      .then(res => {
        setFund(res.data.fund);
        setIsLoaded(true);
      })
      .catch(err => {
        console.log(err);
      })
  }, [fundID])

  // Fetch organization data by organization ID
  useEffect(() => {
    getOrganizationByID(fund.organizationID)
      .then(res => {
        setOrganization(res.data.organization);
      })
  }, [fund.organizationID])

  // Function to handle fund removal
  const removeFundbtn = (e) => {
    e.preventDefault();
    swal({
      title: "שים לב",
      text: "אם תסיר את הבקשה, כל התרומות שנאספו עד כה יאבדו ולא תוכל לשחזר אותן",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeFund(fundID).then(res => {
          swal("הבקשה נמחקה", {
            icon: "success",
          });
          navigate("/organization/funds");
        }).catch(err => {
          swal("Something went wrong!", {
            icon: "error",
          });
        })
      }
    });
  }

  // Function to handle donation button click
  const handleDonate = (e) => {
    e.preventDefault();
    if (getCookie("roles") === '1984') {
      document.getElementById("donateModal").style.display = "block";
    } else {
      swal("אתה צריך להתחבר קודם", {
        icon: "warning",
        buttons: ["Cancel", "Login"],
      }).then((willLogin) => {
        if (willLogin) {
          navigate(`/user/signin`);
        }
      });
    }
  }

  // Function to close donate modal
  const closeDonateModal = (e) => {
    e.preventDefault();
    document.getElementById("donateModal").style.display = "none";
  }



  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " >
        { getCookie("roles") === '5150' ? ("") : (<div className='mb-3'><NavBar /></div>)}

        <div className="container-fluid" onClick={toggleSidenav} dir="rtl"> 
         {/* Back button */}
          <i className="bi bi-arrow-left-circle fs-4 cursor-pointer"
            onClick={() => navigate(-1)}> הקודם</i>

          <div className="card card-body px-md-5 pb-5 my-3">
            {/* Edit and delete buttons for organization */}
            { fund.organizationID === getCookie("uId") && fund.status !== "completed" ? (
                <div className="col-lg-2 col-sm-3 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3" dir="ltr">
                  <div className="progress-container">
                    <ul className="nav nav-pills nav-fill p-1" role="tablist">
                      <li className="nav-item">
                        <Link className="nav-link mb-0 px-0 py-1 active" to={`/fund/editFund`} state={fund}>
                          <i className="material-icons text-lg position-relative">edit</i>
                          <span className="ms-1">ערוך</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#" onClick={removeFundbtn} className="nav-link mb-0 px-0 py-1 text-primary">
                          <i className="material-icons text-lg position-relative">delete</i>
                          <span className="ms-1">מחק</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null
            }
            <h3 className='mt-3'>{fund.title}</h3>
            
            {/* Fund details */}
            {isLoaded ? (
              <div className="row">
                <div className="col-sm-5 row">
                  <div className="my-5">
                    <img src={fund.fundImage} className="img-fluid rounded card-image" alt={fund.title} />
                  </div>
                  <div className='card p-3'>
                    <h5>פרטים ליצירת קשר</h5>
                    <div className="row mt-2">
                      <h6 className="text-dark font-weight-bold col-md-3">Email:</h6>
                      <span className="mb-0 col-md-9">{fund.contactEmail}</span>
                    </div>
                    <div className="row">
                      <h6 className="text-dark font-weight-bold col-md-3">טלפון:</h6>
                      <span className="mb-0 col-md-9">{fund.contactNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7 my-5 ps-sm-4">
                  <h5>מטרה</h5>
                  <p className='text-justify'>{fund.target}</p>
                  <div className='mt-3'>
                    <div className="d-flex">
                      <div className='text-dark font-weight-bold p-2 ps-0'>יעד:</div>
                      <div className='p-2'>₪ {fund.budget}</div>
                    </div>
                    <div className="d-flex">
                      <div className='text-dark font-weight-bold p-2 ps-0'>נותר לגיוס:</div>
                        <div className='p-2'>₪ {fund.budget - fund.currentAmount}</div>
                    </div>
                    <div>
                      <ProgressBar
                          completed={Math.round(fund.currentAmount / fund.budget * 100)}
                          labelSize={"10px"}
                          labelColor="#FDE1FF" />
                    </div>
                    <div className="d-flex mt-3">
                      <div className='text-dark font-weight-bold p-2 ps-0'>תאריך סיום:</div>
                      <div className='p-2'>{new Date(fund.endingDate).toISOString().split('T')[0]}</div>
                    </div>
                    <div className="d-flex">
                      <div className='text-dark font-weight-bold p-2 ps-0'>זמן שנותר:</div>
                      <div className='p-2'>{getRemainingTime(fund.endingDate)}</div>
                    </div>
                    <div className="mt-3">
                      <h5 className='text-dark font-weight-bold p-2 ps-0'>תיאור</h5>
                      <div className='p-2 text-justify'>{fund.description}</div>
                    </div>
                  </div>
                  {
                    getCookie("roles") === '1984' || !getCookie("roles") ? (
                      <div className='mt-3'>
                        <button className="btn btn-primary" onClick={handleDonate}>לתרומה</button>
                      </div>) : null
                  }
                </div>
                {
                  getCookie("roles") === '1984' ? (
                    <div className="modal blur-my-dark" id="donateModal">
                      <div className="modal-dialog">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">לתרומה</h4>
                              <button onClick={closeDonateModal} type="button" className="btn fs-4">&times;</button>
                            </div>
                            <div className="modal-body">
                              <DonateFund organizationID={fund.organizationID} fundID={fund._id} fund={fund} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  ) : null
                }
              </div>
            ) : <LoadingSpinner />}
          </div>

        </div>
      </main >
    </>
  )
}

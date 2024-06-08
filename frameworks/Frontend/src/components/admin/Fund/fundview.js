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

export default function ViewSelectedFund() {
  const [fund, setFund] = useState({ organizationID: "", endingDate: "2022-09-27T12:20:02.029+00:00" });
  const [organization, setOrganization] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const { fundID } = useParams();
  const navigate = useNavigate()

  // Fetch fund details by ID when component mounts
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

  // Fetch organization details by organization ID
  useEffect(() => {
    getOrganizationByID(fund.organizationID)
      .then(res => {
        setOrganization(res.data.organization);
      })
  }, [fund.organizationID])

  // Handle the removal of a fund
  const removeFundbtn = (e) => {
    e.preventDefault();
    swal({
      textDirection: "rtl",
      title: "שים לב",
      text: "אם תסיר את הגיוס, כל התרומות שנאספו עד כה יאבדו ולא תוכל לשחזר אותן",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeFund(fundID).then(res => {
          swal("גיוס כספים נמחק בהצלחה", {
            icon: "success",
          });
          navigate("/organization/funds");
        }).catch(err => {
          swal("שגיאה בזמן מחיקת התרומה", {
            icon: "error",
          });
        })
      }
    });
  }



  return (
    <>
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " >
      { (getCookie("roles") === '5150' || getCookie("roles") === '2001') ? ("") : (<div className='mb-3'><NavBar /></div>)}

      <div className="container-fluid mb-3"  dir="rtl">
        <i className="bi bi-arrow-left-circle fs-4 cursor-pointer"
          onClick={() => navigate(-1)}> הקודם</i>
        <h3 className='mt-3'>{fund.title}</h3>
        {
          fund.organizationID === getCookie("uId") && fund.status !== "completed" ? (
            <div className="col-lg-2 col-sm-3 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
              <div className="nav-wrapper position-relative end-0">
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
        {isLoaded ? (
          <div className="row me-4 ">
            <div className="col-sm-5 row">
              <div className="my-3">
                <img src={fund.fundImage} className="img-fluid rounded card-image" alt={fund.title} />
              </div>
              <div className='card p-3 my-4'>
                <h5>פרטים ליצירת קשר</h5>
                <div className="row mt-2">
                  <h6 className="text-dark font-weight-bold col-md-3">Email:</h6>
                  <span className="mb-0 col-md-9">{fund.contactEmail}</span>
                </div>
                <div className="row">
                  <h6 className="text-dark font-weight-bold col-md-3">מספר איש קשר:</h6>
                  <span className="mb-0 col-md-9">{fund.contactNumber}</span>
                </div>
              </div>
            </div>
            <div className="col-sm-7 my-5 ps-sm-4 me-4">
              <h5>מטרה</h5>
              <p className='text-justify'>{fund.target}</p>
              <div className='mt-3'>
                <div className="d-flex">
                  <div className='text-dark font-weight-bold p-2 ps-0'>סכום:</div>
                  <div className='p-2'>₪ {fund.budget}</div>
                </div>
                <div className="d-flex">
                  <div className='text-dark font-weight-bold p-2 ps-0'>כספים שנאספו:</div>
                  <div className='p-2'>₪ {fund.currentAmount}</div>
                </div>
                <div>
                  <ProgressBar
                      completed={Math.round(fund.currentAmount / fund.budget * 100)}
                      labelSize={"10px"}
                      labelColor="#FDE1FF"/>
                </div>
                <div className="d-flex mt-3">
                  <div className='text-dark font-weight-bold p-2 ps-0'>תאריך סיום:</div>
                  <div className='p-2'>{new Date(fund.endingDate).toISOString().split('T')[0]}</div>
                </div>
                <div className="d-flex">
                  <div className='text-dark font-weight-bold p-2 ps-0'>זמן שנשאר:</div>
                  <div className='p-2'>{getRemainingTime(fund.endingDate)}</div>
                </div>
                <div className="mt-3">
                  <h5 className='text-dark font-weight-bold p-2 ps-0'>תיאור</h5>
                  <div className='p-2 text-justify'>{fund.description}</div>
                </div>
              </div>
            </div>
          </div>
        ) : <LoadingSpinner />}

      </div>
    </main >
  </>
  )
}

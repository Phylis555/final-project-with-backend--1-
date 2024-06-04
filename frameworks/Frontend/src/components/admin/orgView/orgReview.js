import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { getAuthHeader } from "../../common/authHeader";

export default function AdminReviewOrg() {
  const navigate = useNavigate();
  const {id}=useParams();

  // State variables for organization details
  const [OrgId,setOrgId]=useState("");
  const [OrgName,setOrgName]=useState("");
  const [OrgAddress,setOrgAddress]=useState("");
  const [OrgZipCode,setOrgZipCode]=useState("");
  const [OrgContactNo,setOrgContactNo]=useState("");
  const [OrgEmail,setOrgEmail]=useState("");
  const [sname,setSname]=useState("");
  const [semail,setSemail]=useState("");
  const[sContactNo,setSContactNo]=useState("");
  const [pname,setPname]=useState("");
  const [pemail,setPemail]=useState("");
  const[pContactNo,setPContactNo]=useState("");
  const [OrgStatus,setOrgStatus]=useState("");

  // Fetch organization details based on ID
  useEffect(()=>{
    const fetchOrg=async()=>{
      await axios
      .get(`http://localhost:8070/admin/vieworg/${id}`,getAuthHeader())
      .then((res)=>{
        // Set organization details to state variable
          setOrgId(res.data.org._id);
          setOrgName(res.data.org.name);
          setOrgAddress(res.data.org.address);
          setOrgContactNo(res.data.org.contactNumber);
          setOrgEmail(res.data.org.email);
          setOrgZipCode(res.data.org.zipCode);
          setPContactNo(res.data.org.presidentContactNumber);
          setPemail(res.data.org.presidentEmail);
          setPname(res.data.org.presidentName);
          setSContactNo(res.data.org.secretaryContactNumber);
          setSemail(res.data.org.secretaryEmail);
          setSname(res.data.org.secretaryName);
          setOrgStatus(res.data.org.status);
    })
    .catch((e)=>{
        console.log(e);
    })};
    fetchOrg();
  },[]);

  // Function to handle organization details update
  const editOrganization =  (e) => {
    e.preventDefault();
    const Organization = {
      OrgName,
      OrgId,
      OrgAddress,
      OrgContactNo,
      OrgEmail,
      OrgStatus,
      OrgZipCode,
      pContactNo,
      pemail,
      pname,
      sContactNo,
      semail,
      sname
    };
    swal({
        textDirection: "rtl",
        title: "שים לב",
        text: "האם ברצונך לעדכן את פרטי הארגון",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .put(`http://localhost:8070/admin/editorg/${id}`, Organization,getAuthHeader())
            .then(() => {
              if (willDelete) {
                swal("פרטי הארגון עודכנו בהצלחה", { icon: "success" })
                setTimeout(function () {
                  window.location.reload()
                }, 3000)
              } else {
                swal("File Is Not Updated")
              }
            })
        }
      })
    }

    // Function to handle acceptance of organization registration request
    const onAccept = (id)=>{
      swal({
          textDirection: "rtl",
          title: "שים לב",
          text: "בקשת רישום הארגון תאושר",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios
              .put(`http://localhost:8070/admin/uporgstatus/${id}`, null, getAuthHeader())
              .then(() => {
                if (willDelete) {
                  swal("בקשת רישום הארגון אושרה בהצלחה", { icon: "success" })
                  setTimeout(function () {
                    navigate(-1)
                  }, 3000)
                } else {
                  swal("הבקשה לא אושרה")
                }
              })
          }
        })  
    }
  // Function to handle deletion of organization registration request
  const onDelete = (id)=>{
    swal({
        textDirection: "rtl",
        title: "שים לב",
        text: "בקשת רישום הארגון תוסר מהמערכת",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`http://localhost:8070/admin/deletereqorg/${id}`, getAuthHeader())
            .then(() => {
              if (willDelete) {
                swal("בקשת רישום הארגון נמחקה בהצלחה", { icon: "success" })
                setTimeout(function () {
                  window.location.reload()
                }, 3000)
              } else {
                swal("הבקשה לא נמחקה")
              }
            })
        }
      })
  }

  const[orgDetails, setOrgDetails]=useState([])
  return (
    <>
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
      <div className="container my-auto" style={{ paddingTop: 30 }}>
        <div className="row">
          <div className="mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-body">
                <form role="form" className="text-start" onSubmit={editOrganization} >
                  <div className="d-flex justify-content-center">
                    <h4>סקור את פרטי הארגון</h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>* שדות חובה</h6>
                  </div>
                  <label htmlFor="orgId">מזהה ארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="orgId"
                      className="form-control"
                      placeholder="Donation Title*"
                      aria-label="Donation Title"
                      aria-describedby="basic-addon1"
                      value={OrgId}
                      disabled
                    />
                  </div>

                  <label htmlFor="orgName">שם הארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="orgName"
                      className="form-control"
                      placeholder="Donation Title*"
                      aria-label="Donation Title"
                      aria-describedby="basic-addon1"
                      value={OrgName}
                      onChange={(e) => { 
                        setOrgName(e.target.value) 
                      }}
                      required
                    />
                  </div>
               
                  <label htmlFor="orgAddress">כתובת </label>
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location*"
                      aria-label="Location"
                      id="orgAddress"
                      aria-describedby="basic-addon1"
                      value={OrgAddress}
                      onChange={(e) => {
                      setOrgAddress(e.target.value)
                      }}
                      required
                    />
                  </div>

                  <label htmlFor="orgZipCode">מיקוד </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location*"
                      aria-label="Location"
                      id="orgZipCode"
                      aria-describedby="basic-addon1"
                      value={OrgZipCode}
                      onChange={(e) => {
                         setOrgZipCode(e.target.value)
                      }}
                      required
                      disabled
                    />
                  </div>
                  <label htmlFor="orgContactNo">מספר איש קשר של הארגון </label>
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      id="orgContactNo"
                      className="form-control"
                      value={OrgContactNo}
                      disabled
                      onChange={(e) => {
                        setOrgContactNo(e.target.value)
                      }}
                    />
                  </div>
                  <label htmlFor="orgEmail">Email</label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      id="orgEmail"
                      className="form-control"
                      placeholder="Email*"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      value={OrgEmail}
                      onChange={(e) => {
                        setOrgEmail(e.target.value)
                      }}
                      required
                      disabled
                    />
                  </div>
                  <label htmlFor="sname">שם מזכירת הארגון </label>
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      className="form-control"
                      type="text"
                      id="sname"
                      value={sname}
                       onChange={(e) => {
                         setSname(e.target.value);
                       }}
                      disabled
                    />
                  </div>

                  <label htmlFor="sContactNo">טלפון מזכירת הארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      className="form-control"
                      id="sContactNo"
                      value={sContactNo}
                      onChange={(e) => {
                        setSContactNo(e.target.value)
                      }}
                      disabled
                    />
                  </div>

                  <label htmlFor="semail">Email מזכירות</label>
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                      aria-label="Email"
                      id="semail"
                      aria-describedby="basic-addon1"
                      value={semail}
                      onChange={(e) => {
                        setSemail(e.target.value)
                      }}
                      disabled
                    />
                  </div>


                  <label htmlFor="mName">שם מנהל הארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      className="form-control"
                      type="text"
                      id= "mName"
                      value={pname}
                       onChange={(e) => {
                         setPname(e.target.value)
                       }}
                      disabled
                    />
                  </div>

                  <label htmlFor="mContact">טלפון מנהל הארגון</label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      id= "mContact"
                      pattern="[0]{1}[0-9]{9}"
                      className="form-control"
                      value={pContactNo}
                      onChange={(e) => {
                        setPContactNo(e.target.value)
                      }}
                      disabled
                    />
                  </div>

                  <label htmlFor="mEmail"> Email מנהל הארגון</label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      id= "mEmail"
                      className="form-control"
                      placeholder="Email*"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      value={pemail}
                      onChange={(e) => {
                        setPemail(e.target.value)
                      }}
                      required
                    />
                  </div>

                  <label>סטטוס הארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      className="form-control"
                      type="text"
                      value={OrgStatus}
                       onChange={(e) => {
                         setOrgStatus(e.target.value);
                       }}
                      id="date"
                      disabled
                    />
                  </div>
      
                </form>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-success ms-2" onClick={()=>{onAccept(id)}}>
                      אשר
                    </button>
                    <button type="delete" className="btn btn-outline-danger me-2" onClick={()=>{onDelete(id)}}>
                      מחק
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </>
  );
}

import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { getAuthHeader } from "../../common/authHeader";

export default function AdminEditOrg() {
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
      await axios.get(`http://localhost:8070/admin/vieworg/${id}`,getAuthHeader())
      .then((res)=>{
        // Set organization details to state variables
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
  }, [id]);

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
    // Confirmation before updating organization details
  swal({
      title: "שים לב",
      text: "האם ברצונך לעדכן את פרטי הארגון",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:8070/admin/editorg/${id}`, Organization, getAuthHeader())
          .then(() => {
            if (willDelete) {
              // Show success message if organization details are updated successfully
              swal("פרטי הארגון עודכנו בהצלחה", { icon: "success" })
              setTimeout(function () {
                 // Reload the page after successful update
                window.location.reload()
              }, 3000)
            } else {
            // Show error message if there's an issue with updating organization details
              swal("שגיאה בעדכון פרטים ")
            }
          })
      }
    })
  }

  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <div className="container my-auto" style={{ paddingTop: 30 }} dir="rtl">
        <div className="row">
          <div className="mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-body">
                <form role="form" className="text-start" onSubmit={editOrganization} >
                  <div className="d-flex justify-content-center">
                    <h4>ערוך את פרטי הארגון</h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>* שדות חובה</h6>
                  </div>
                  <label >מספר מזהה ארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Donation Title*"
                      aria-label="Donation Title"
                      aria-describedby="basic-addon1"
                      value={OrgId}
                      disabled
                      required
                    />
                  </div>

                  <label>שם הארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
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
               
                  <label>כתובת </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location*"
                      aria-label="Location"
                      aria-describedby="basic-addon1"
                      value={OrgAddress}
                      onChange={(e) => {
                      setOrgAddress(e.target.value)
                      }}
                      required
                    />
                  </div>

                  <label>מיקוד </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location*"
                      aria-label="Location"
                      aria-describedby="basic-addon1"
                      value={OrgZipCode}
                      onChange={(e) => {
                         setOrgZipCode(e.target.value)
                      }}
                      required
                    />
                  </div>
                  <label>מספר ליצירת קשר </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      className="form-control"
                      value={OrgContactNo}
                      onChange={(e) => {
                        setOrgContactNo(e.target.value)
                      }}
                    />
                  </div>
                  <label>הארגון Email</label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      value={OrgEmail}
                      onChange={(e) => {
                        setOrgEmail(e.target.value)
                      }}
                      required
                    />
                  </div>
                  <label>שם המזכירה </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      className="form-control"
                      type="text"
                      value={sname}
                       onChange={(e) => {
                         setSname(e.target.value);
                       }}
                      id="date"
                    />
                  </div>

                  <label>מספר טלפון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      className="form-control"
                      value={sContactNo}
                      onChange={(e) => {
                        setSContactNo(e.target.value)
                      }}
                    />
                  </div>

                  <label> Email</label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      value={semail}
                      onChange={(e) => {
                        setSemail(e.target.value)
                      }}
                      required
                    />
                  </div>

                  <label>שם מנהל הארגון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      className="form-control"
                      type="text"
                      value={pname}
                       onChange={(e) => {
                         setPname(e.target.value)
                       }}
                      id="date"
                    />
                  </div>

                  <label>מספר טלפון </label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      className="form-control"
                      value={pContactNo}
                      onChange={(e) => {
                        setPContactNo(e.target.value)
                      }}
                    />
                  </div>

                  <label>Email</label> 
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
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

                  <label>סטטוס </label> 
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
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      עדכן פרטים
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    
  );
}

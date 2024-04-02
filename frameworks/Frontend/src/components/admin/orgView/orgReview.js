import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import orgView from "./orgView.css"

export default function AdminReviewOrg() {
  const navigate = useNavigate();
  const {id}=useParams();

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

  useEffect(()=>{
    const fetchOrg=async()=>{
        console.log(id)
        await axios
        .get(`http://localhost:8070/admin/vieworg/${id}`)
        .then((res)=>{
            console.log(res)
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
    })
    
    };
    fetchOrg();
    
  },[]);

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
//     await axios
//       .put(`http://localhost:8070/admin/editorg/${id}`, Organization)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     console.log(Organization)
//   };
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
        .put(`http://localhost:8070/admin/editorg/${id}`, Organization)
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

  const onAccept = (id)=>{
    // navigate(-1)
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
            .put(`http://localhost:8070/admin/uporgstatus/${id}`)
            .then(() => {
              if (willDelete) {
                swal("בקשת רישום הארגון אושרה בהצלחה", { icon: "success" })
                setTimeout(function () {
                  navigate(-1)
                }, 3000)
              } else {
                swal("File Is Not Deleted")
              }
            })
        }
      })
    

}

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
            .delete(`http://localhost:8070/admin/deletereqorg/${id}`)
            .then(() => {
              if (willDelete) {
                swal("בקשת רישום הארגון נמחקה בהצלחה", { icon: "success" })
                setTimeout(function () {
                  window.location.reload()
                }, 3000)
              } else {
                swal("File Is Not Deleted")
              }
            })
        }
      })
}





  const[orgDetails, setOrgDetails]=useState([])

  

  return (
    <>
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
      {/* <span class="mask bg-gradient-dark opacity-6"></span> */}
      <div class="container my-auto" style={{ paddingTop: 30 }}>
        <div class="row">
          <div class="mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-body">
                <form role="form" class="text-start" onSubmit={editOrganization} >
                  <div class="d-flex justify-content-center">
                    <h4>סקור את פרטי הארגון</h4>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div></div>
                    <div></div>
                    <h6>* שדות חובה</h6>
                  </div>
                  <label className={orgView.lable}>מזהה ארגון </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Donation Title*"
                      aria-label="Donation Title"
                      aria-describedby="basic-addon1"
                      value={OrgId}
                      disabled
                      required
                    />
                  </div>

                  <label className={orgView.lable}>שם הארגון </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Donation Title*"
                      aria-label="Donation Title"
                      aria-describedby="basic-addon1"
                      value={OrgName}
                      onChange={(e) => { 
                        setOrgName(e.target.value) 
                      }}
                      required
                      disabled
                    />
                  </div>
               
                  <label className={orgView.lable}>כתובת </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Location*"
                      aria-label="Location"
                      aria-describedby="basic-addon1"
                      value={OrgAddress}
                      onChange={(e) => {
                      setOrgAddress(e.target.value)
                      }}
                      required
                      disabled
                    />
                  </div>

                  <label className={orgView.lable}>מיקוד </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Location*"
                      aria-label="Location"
                      aria-describedby="basic-addon1"
                      value={OrgZipCode}
                      onChange={(e) => {
                         setOrgZipCode(e.target.value)
                      }}
                      required
                      disabled
                    />
                  </div>
                  <label className={orgView.lable}>מספר איש קשר של הארגון </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      class="form-control"
                      value={OrgContactNo}
                      disabled
                      onChange={(e) => {
                        setOrgContactNo(e.target.value)
                      }}
                    />
                    {/* <input type="text" name="country_code"></input> */}
                  </div>
                  <label className={orgView.lable}>Email</label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      class="form-control"
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
                  <label className={orgView.lable}>שם מזכירת הארגון </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      class="form-control"
                      type="text"
                      value={sname}
                       onChange={(e) => {
                         setSname(e.target.value);
                       }}
                      id="date"
                      disabled
                    />
                  </div>

                  <label className={orgView.lable}>טלפון מזכירת הארגון </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      class="form-control"
                      value={sContactNo}
                      onChange={(e) => {
                        setSContactNo(e.target.value)
                      }}
                      disabled
                    />
                  </div>

                  <label className={orgView.lable}>Email מזכירות</label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email*"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      value={semail}
                      onChange={(e) => {
                        setSemail(e.target.value)
                      }}
                      required
                      disabled
                    />
                  </div>


                  <label className={orgView.lable}>שם מנהל הארגון </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      class="form-control"
                      type="text"
                      value={pname}
                       onChange={(e) => {
                         setPname(e.target.value)
                       }}
                      id="date"
                      disabled
                    />
                  </div>

                  <label className={orgView.lable}>טלפון מנהל הארגון</label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="Contact Number*"
                      aria-label="Contact Number"
                      aria-describedby="basic-addon1"
                      title="Error Message"
                      pattern="[0]{1}[0-9]{9}"
                      class="form-control"
                      value={pContactNo}
                      onChange={(e) => {
                        setPContactNo(e.target.value)
                      }}
                      disabled
                    />
                  </div>

                  <label className={orgView.lable}> Email מנהל הארגון</label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      class="form-control"
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

                  <label className={orgView.lable}>סטטוס הארגון </label> 
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      placeholder="Donation End Date"
                      class="form-control"
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
                <div class="text-center">
                    <button type="submit" class="btn btn-outline-success ms-2" onClick={()=>{onAccept(id)}}>
                      אשר
                    </button>
                    <button type="delete" class="btn btn-outline-danger me-2" onClick={()=>{onDelete(id)}}>
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

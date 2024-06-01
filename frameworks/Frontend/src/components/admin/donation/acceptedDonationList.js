import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../dashTable/dashTable.module.css";
import swal from "sweetalert";
import axios from "axios";
import "jspdf-autotable";
import { getAuthHeader } from "../../common/authHeader";

export default function GetAcceptedDonations() {
 
  const navigate = useNavigate()
  const [datatable, setDatatable] = useState([]);
  const [search,setSearch]=useState("");

  // Fetch the list of accepted donations
  const getReqOrgList=async()=>{
    try{
      const data=await axios.get(`http://localhost:8070/admin/getaccepteddon/`, getAuthHeader());
      setDatatable(data.data)
    }catch(e){
      if (e.response.data.message === "jwt expired") {
        logOut();
      }
        console.log(e)
    }
  }

  // Fetch data when the component mounts
  useEffect(()=>{
      getReqOrgList();
  },[]);

  // Handle rejecting a donation request
  const onDelete = (id)=>{
    swal({
        title: "שים לב",
        text: "בקשת התרומה תדחה",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .put(`http://localhost:8070/admin/rejectdonation/${id}`, null, getAuthHeader())
            .then(() => {
              if (willDelete) {
                swal("בקשת התרומה נדחתה", { icon: "success" })
                setTimeout(function () {
                  window.location.reload()
                }, 3000)
              } else {
                swal("הבקשה לא נדחתה")
              }
            })
        }
      })
  }
  return (
    
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
        <div className="container-fluid py-4" >
          <div className="row">
              <h2>תרומות ציוד שאושרו</h2>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8 my-3 me-3">
          <div className="input-group input-group-outline bg-white">
            <input
                className="form-control"
                type="text"
                placeholder="חפש"
                aria-label="Search"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
          </div>
        </div> 
        <div className="row me-3">
        <div className={classes.DashTable}>
          <div className={classes.TableBack}>
            <table className={classes.Table}>
              <thead>
                <tr>
                  <th>כותרת</th>
                  <th>Email</th>
                  <th>תיאור</th>
                  <th id={classes.ActionSec}>פעולה</th>
                </tr>
              </thead>
              <tbody>
                {datatable.filter((org) => {
                  if (search === "") return org;
                  return Object.values(org).some(value =>
                    value.toString().toLowerCase().includes(search.toLowerCase())
                  );
                }).map((org) => (
                  <tr key={org._id}>
                    <td>{org.donationTitle}</td>
                    <td>{org.email}</td>
                    <td>{org.donationDescription}</td>
                    <td>
                      <div className={classes.ActionBtnSec}>
                        <Link
                          to={`/donator/view/${org._id}`}
                          state={{ fromAdmin: true, accepted: true }}
                        >
                          <button className="btn btn-outline-info">בדוק</button>
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(org._id)}
                        >
                          דחה
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </main>
   
  )
}

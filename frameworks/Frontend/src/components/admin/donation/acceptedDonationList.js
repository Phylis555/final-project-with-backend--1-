import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact'
import SideNav from "../sideNav";
import classes from "../dashTable/dashTable.module.css";
import NavButton from "../orgrequestlist/NavButton";
import swal from "sweetalert";
import axios from "axios";
import "jspdf-autotable";
import { getAuthHeader } from "../../common/authHeader";

export default function GetAcceptedDonations() {
  const toggleSidenav = (e) => {
      e.preventDefault();
      document.body.classList.remove("g-sidenav-pinned");
  };
  const navigate = useNavigate()
  // const navigateTo=()=> useNavigate.push('/admin/orgview/id')


  const [datatable, setDatatable] = useState([]);
  const [search,setSearch]=useState("");

  const getReqOrgList=async()=>{
      try{
          const data=await axios.get(`http://localhost:8070/admin/getaccepteddon/`, getAuthHeader);
          setDatatable(data.data)

      }catch(e){
          console.log(e)
      }
  }

  useEffect(()=>{
      getReqOrgList();
  },[]);


  const onView=(id)=>{
      const oid=id;
      navigate(`/admin/viewreqfund/${oid}`)
      console.log(oid);
  }

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
              .put(`http://localhost:8070/admin/rejectdonation/${id}`)
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
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
        <div className="container-fluid py-4" onClick={toggleSidenav}>
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
            />{" "}
          </div>
        </div> 
        <div className="row me-3">
          <div className={classes.DashTable}>
            <div className={classes.TableBack}>
              <table className={classes.Table}>
                <tr>
                  <th>כותרת</th>
                  <th>Email</th>
                  <th>תיאור</th>
                  <th id={classes.ActionSec}>פעולה</th>
                </tr>
                {datatable.filter((org) => {
                  if (search === "") {
                      return org;
                  } else {
                      return Object.values(org).some(value =>
                          value.toString().toLowerCase().includes(search.toLowerCase())
                      );
                  }
                }).map((org) => {
                  return (
                      <tr>
                          <td>{org.donationTitle}</td>
                          <td>{org.email}</td>
                          <td>{org.donationDescription}</td>
                          <td>
                              <div className={classes.ActionBtnSec}>
                                  <Link
                                      to={"/donator/view/" + org._id}
                                      state={{
                                          fromAdmin: true,
                                          accepted: true,
                                      }}>
                                      <button className="btn btn-outline-info" >בדוק</button>
                                  </Link>
                                  <button className="btn btn-outline-danger" onClick={() => { onDelete(org._id) }} >דחה</button>
                              </div>
                          </td>
                      </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

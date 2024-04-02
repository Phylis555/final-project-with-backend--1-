import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import classes from "./dashTable/dashTable.module.css";
import swal from "sweetalert";
import axios from "axios";
import "jspdf-autotable";

export default function OrganizationRequestList() {

    const toggleSidenav = (e) => {
        e.preventDefault();
        document.body.classList.remove("g-sidenav-pinned");
    };
    const navigate = useNavigate()

    const [datatable, setDatatable] = useState([]);
    const [search,setSearch]=useState("");

    const getReqOrgList=async()=>{
        try{
            const data=await axios.get(`http://localhost:8070/admin/reqorglist`);
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
        navigate(`/admin/revieworg/${oid}`)
        console.log(oid);
    }



    const onDelete = (id)=>{
        swal({
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
                    swal("הבקשה לא נמחקה")
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
                <h2>ארגונים ממתינים לאישור</h2>
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
                    <th>שם</th>
                    <th>כתובת</th>
                    <th>תאריך רישום</th>
                    <th id={classes.ActionSec}>פעולה</th>
                  </tr>
                  {datatable.filter((org)=>{
                    if (search==""){
                    console.log(org)
                      return org;
                    }else if (org.name.toLowerCase().includes(search.toLocaleLowerCase())){
                        return org
                    }
                  }).map((org)=>{
                    return(
                      <tr>
                          <td>{org.name}</td>
                          <td>{org.address}</td>
                          <td>{(org.registrationDate).substring(0,10)}</td>
                          <td>
                            <div className={classes.ActionBtnSec}>
                              <button className="btn btn-outline-info" onClick={()=>{onView(org._id)}}>בדיקה</button>
                              <button className="btn btn-outline-danger" onClick={()=>{onDelete(org._id)}}>דחה</button>
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

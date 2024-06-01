import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import classes from "./dashTable/dashTable.module.css";
import axios from "axios";
import { getAuthHeader } from "../common/authHeader";

export default function OrganizationRequestList() {
    // State hooks for managing data and search input
    const navigate = useNavigate()
    const [datatable, setDatatable] = useState([]);
    const [search,setSearch]=useState("");

    // Fetch the list of approved organizations
    const getReqOrgList=async()=>{
        try{
            const data=await axios.get(`http://localhost:8070/admin/approvedorg`,getAuthHeader());
            setDatatable(data.data)

        }catch(e){
            if (e.response.data.message === "jwt expired") {
                logOut();
              }
            console.log(e)
        }
    }

    // Navigate to the organization editing page
    const onView=(id)=>{
        const oid=id;
        navigate(`/admin/editorg/${oid}`)
        console.log(oid);
    }

    // Fetch the list of approved organizations when the component mounts
    useEffect(()=>{
        getReqOrgList();
    },[]);

    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
            <div className="container-fluid py-4" >
                <div className="row">
                    <h2> ארגונים רשומים</h2>
                    <div className="col-lg-4 col-md-6 col-sm-8 my-3">
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
                </div>
            </div>
            <div className="row me-3">
                <div className={classes.DashTable}>
                    <div className={classes.TableBack}>
                        <table className={classes.Table}>
                            <thead>
                                <tr>
                                    <th>שם הארגון</th>
                                    <th>כתובת</th>
                                    <th>תאריך רישום</th>
                                    <th id={classes.ActionSec}>פעולות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datatable
                                    .filter((org) => {
                                        // Filter organizations based on search input
                                        if (search === "") {
                                            return org;
                                        } else if (org.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                                            return org;
                                        }
                                    })
                                    .map((org) => (
                                        <tr key={org._id}>
                                            <td>{org.name}</td>
                                            <td>{org.address}</td>
                                            <td>{org.registrationDate.substring(0, 10)}</td>
                                            <td>
                                                <div className={classes.ActionBtnSec}>
                                                    <button className="btn btn-outline-info" onClick={() => onView(org._id)}>
                                                        ערוך
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

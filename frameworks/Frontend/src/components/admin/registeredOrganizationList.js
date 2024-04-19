import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import classes from "./dashTable/dashTable.module.css";
import axios from "axios";

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
            const data=await axios.get(`http://localhost:8070/admin/approvedorg`);
            setDatatable(data.data)

        }catch(e){
            console.log(e)
        }
    }

    const onView=(id)=>{
        const oid=id;
        navigate(`/admin/editorg/${oid}`)
        console.log(oid);
    }

    useEffect(()=>{
        getReqOrgList();
    },[]);



    return (
        <>
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
                <div className="container-fluid py-4" onClick={toggleSidenav}>
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
                                />{" "}
                            </div>
                        </div> 
                    </div>
                </div>
            
                <div className="row me-3">
                    <div className={classes.DashTable}>
                        <div className={classes.TableBack}>
                            <table className={classes.Table}>
                                <tr>
                                    <th>שם הארגון</th>
                                    <th>כתובת</th>
                                    <th>תאריך רישום</th>
                                    <th id={classes.ActionSec}>פעולות</th>
                                </tr>
                                {datatable.filter((org)=>{
                                    if (search==""){
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
                                                <button className="btn btn-outline-info" onClick={()=>{onView(org._id)}}>ערוך</button>

                                                </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>   
    )
}

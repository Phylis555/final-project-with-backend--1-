import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'
import SideNav from "../sideNav";
import classes from "../dashTable/dashTable.module.css";
import NavButton from "../orgrequestlist/NavButton";
import swal from "sweetalert";
import axios from "axios";

export default function GetUserList() {

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
            const data=await axios.get(`http://localhost:8070/admin/getusers/`);
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

 
    
    



    return (
        <>
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
                {/* <NavButton /> */}
                <div className="container-fluid py-4" onClick={toggleSidenav}>
                    <div className="row">
                        <h2>רשימת משתמשים</h2>
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
                    </div>
                </div>
                <div className="row me-4 mb-3">
                    <div className={classes.DashTable}>
                        <div className={classes.TableBack}>
                            <table className={classes.Table}>
                                <tr>
                                    <th>שם פרטי</th>
                                    <th>שם משפחה</th>
                                    <th>Email</th>
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
                                                <td>{org.firstName}</td>
                                                <td>{org.lastName}</td>
                                                <td>{org.email}</td>
                                                <td>
                                                <div className={classes.ActionBtnSec}>
                                                    <button className="btn btn-outline-info" onClick={()=>{onView(org._id)}} >צפה</button>
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

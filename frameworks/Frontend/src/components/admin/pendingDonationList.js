import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import classes from "./dashTable/dashTable.module.css";
import axios from "axios";

export default function PendingDonations() {

    const toggleSidenav = (e) => {
        e.preventDefault();
        document.body.classList.remove("g-sidenav-pinned");
    };
    const navigate = useNavigate()


    const [datatable, setDatatable] = useState([]);
    const [search,setSearch]=useState("");

    const getReqOrgList=async()=>{
        try{
            const data=await axios.get(`http://localhost:8070/admin/getpdon/`);
            setDatatable(data.data)

        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getReqOrgList();
    },[]);

    return (

        <>
        


<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {/* <NavButton /> */}
                <div className="container-fluid py-4" onClick={toggleSidenav}>
                    <div className="row">
                        <h2>תרומות שממתינות לאישור</h2>
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
                    <div className="row">
<div className={classes.DashTable}>
      <div className={classes.TableBack}>
        <table className={classes.Table}>
          <tr>
            <th>Title</th>
            <th>Budget</th>
            <th>Date</th>
            <th id={classes.ActionSec}>Actions</th>
          </tr>
          {datatable.filter((org)=>{
            if (search==""){
            console.log(org)
            return org;
            }else if (org.name.toLowerCase().includes(search.toLocaleLowerCase())){
                return org
            }
          })
          
          .map((org)=>{
                return(

                    <tr>
                        <td>{org.title}</td>
                        <td>{org.budget}</td>
                        <td>{(org.endingDate).substring(0,10)}</td>
                        <td>
                        <div className={classes.ActionBtnSec}>
                            <button className="btn btn-outline-info" >View</button>
                            <button className="btn btn-outline-success">Accept</button>
                            <button className="btn btn-outline-danger" >Delete</button>
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

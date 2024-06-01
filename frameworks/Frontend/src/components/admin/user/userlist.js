import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import classes from "../dashTable/dashTable.module.css";
import axios from "axios";
import { getAuthHeader } from "../../common/authHeader";

export default function GetUserList() {

    const navigate = useNavigate()
    const [datatable, setDatatable] = useState([]);
    const [search,setSearch]=useState("");

    // Function to fetch the list of users
    const getUserList=async()=>{
        try{
            const data=await axios.get(`http://localhost:8070/admin/getusers/`,getAuthHeader());
            setDatatable(data.data);
        }catch(e){
            if (e.response.data.message === "jwt expired") {
                logOut();
              }
            console.log(e)
        }
    }
    // Function to navigate to view user details page
    const onViewUser = (id, userData) => {
        navigate(`/admin/userview/${id}`, {state: {userData}});
    };

    useEffect(()=>{
        getUserList();
    },[]);

    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
            <div className="container-fluid py-4" >
                <div className="row">
                    <h2>רשימת משתמשים</h2>
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
                                    <th>שם פרטי</th>
                                    <th>שם משפחה</th>
                                    <th>Email</th>
                                    <th id={classes.ActionSec}>פעולה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datatable
                                    .filter((user) => {
                                        if (search === "") {
                                            return user;
                                        } else if (user.firstName.toLowerCase().includes(search.toLocaleLowerCase())
                                                    ||user.lastName.toLowerCase().includes(search.toLocaleLowerCase())) {
                                            return user;
                                        }
                                    })
                                    .map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <div className={classes.ActionBtnSec}>
                                                <button className="btn btn-outline-info" onClick={() => onViewUser(user._id, user)}>צפה</button>                                    
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

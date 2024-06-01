import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import classes from "./dashTable/dashTable.module.css";
import { getAuthHeader } from "../common/authHeader";

export default function ApprovedFundraiser() {
    const navigate = useNavigate();

    const [datatable, setDatatable] = useState([]);
    const [search, setSearch] = useState("");

    // Function to fetch approved fundraiser list
    const getApprovedFunds = async () => {
        try {
            const data = await axios.get(`http://localhost:8070/admin/approvedfunds`, getAuthHeader());
            setDatatable(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApprovedFunds();
    }, []);

    // Function to navigate to view fundraiser page
    const onView = (id) => {
        const oid = id;
        navigate(`/admin/viewreqfund/${oid}`);
    };

    // Function to delete fundraiser request
    const onDelete = (id) => {
        swal({
            title: "שים לב",
            text: "בקשת גיוס הכספים תוסר מהמערכת",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`http://localhost:8070/fund/delete/${id}`, getAuthHeader())
                    .then(() => {
                        swal("הבקשה נמחקה בהצלחה", { icon: "success" });
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    })
                    .catch(() => {
                        swal("הבקשה לא נמחקה", { icon: "error" });
                    });
            }
        });
    };

    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg" dir="rtl">
            <div className="container-fluid py-4">
                <div className="row">
                    <h2>גיוסי כספים שאושרו</h2>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8 my-3 me-3">
                <div className="input-group input-group-outline bg-white">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="חפש"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
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
                                    <th>סכום</th>
                                    <th>תאריך</th>
                                    <th id={classes.ActionSec}>פעולה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datatable
                                    .filter((org) => {
                                        if (search === "") {
                                            return org;
                                        } else {
                                            return Object.values(org).some((value) =>
                                                value.toString().toLowerCase().includes(search.toLowerCase())
                                            );
                                        }
                                    })
                                    .map((org) => (
                                        <tr key={org._id}>
                                            <td>{org.title}</td>
                                            <td>{org.budget}</td>
                                            <td>{org.endingDate.substring(0, 10)}</td>
                                            <td>
                                                <div className={classes.ActionBtnSec}>
                                                    <button className="btn btn-outline-info" onClick={() => onView(org._id)}>בדוק</button>
                                                    <button className="btn btn-outline-danger" onClick={() => onDelete(org._id)}>מחק</button>
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
    );
}

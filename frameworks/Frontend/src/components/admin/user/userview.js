import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import { getAuthHeader } from "../../common/authHeader";

const UserView = () => {
    const { id } = useParams();
    const location = useLocation();
    const { userData } = location.state;
    const navigate = useNavigate();

    // Function to delete user
    const onDelete = () => {
        swal({
            title: "שים לב",
            text: "המשתמש ימחק ולא היה ניתן לשחזר את הפרטים שלו",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`http://localhost:8070/admin/deleteuser/${id}`, getAuthHeader())
                    .then(() => {
                        swal("המשתמש נמחק בהצלחה", { icon: "success" });
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    })
                    .catch(() => {
                        swal("הקובץ לא נמחק", { icon: "error" });
                    });
            }
        });
    };

    return (
        <div dir="rtl">
            <i className="bi bi-arrow-left-circle fs-4 m-4 cursor-pointer" onClick={() => navigate(-1)}> הקודם</i>
            <div className="card mx-auto mt-5" style={{ maxWidth: "600px" }}>
                <div className="card-header">
                    <h2 className="text-center">פרטי המשתמש</h2>
                </div>
                <div className="card-body">
                    <p className="fs-5"><strong>מספר משתמש:</strong> {id}</p>
                    <p className="fs-5"><strong>שם פרטי:</strong> {userData.firstName}</p>
                    <p className="fs-5"><strong>שם משפחה:</strong> {userData.lastName}</p>
                    <p className="fs-5"><strong>אימייל:</strong> {userData.email}</p>
                    <p className="fs-5"><strong>מספר טלפון:</strong> 0{userData.contactNumber}</p>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-danger fs-6" onClick={onDelete}>מחק משתמש</button>
                </div>
            </div>
        </div>
    );
};

export default UserView;

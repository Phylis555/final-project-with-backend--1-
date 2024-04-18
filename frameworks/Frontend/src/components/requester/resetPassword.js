import axios from "../../api/axios";
import React, { useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./footer.css";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const RESET_PASSWORD_URL = "/login/resetPassword";

export default function ResetPassword() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        RESET_PASSWORD_URL,
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Assuming the backend returns a success message
      setErrMsg("קישור לאיפוס הסיסמה נשלח לכתובת האימייל שלך.");
      swal("קישור לאיפוס הסיסמה נשלח לכתובת האימייל שלך", "", "success").then((value) => {
        if (value) {
          Navigate("/user/signin");
        }
      });
      
    } catch (err) {
      setErrMsg("שגיאה בעת שליחת בקשה לאיפוס הסיסמה.");
    }

    setLoading(false);
  };

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <div className="container d-flex justify-content-center pt-5 pb-5" dir="rtl">
        <div className="card card-signin z-index-0 fadeIn3 fadeInBottom ">
          <form className="form-control p-5" onSubmit={handleSubmit}>
            <p className="h3 fw-bold text-center mb-2 pb-4 border-bottom">איפוס סיסמה</p>
            <div className="input-group input-group-outline mb-4 pt-4 ps-4">
              <input
                type="email"
                placeholder="מייל"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errMsg && <div className="alert alert-danger">{errMsg}</div>}
            <div className="row border-bottom">
              <div className="mb-4 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary d-block" disabled={loading}>
                  שלח קישור לאיפוס סיסמה
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

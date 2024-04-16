import axios from "../../api/axios";
import React, { useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./footer.css";
import { Link, useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CHANGE_PASSWORD_URL = "/login/changePassword";

export default function ChangePassword() {
  const Navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        CHANGE_PASSWORD_URL,
        JSON.stringify({ token, password, confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Assuming the backend returns a success message
      setSuccessMsg("הסיסמה שונתה בהצלחה.");
      setTimeout(() => {
        Navigate("/user/signin");
        // Close the web tab after showing the success message
        window.close();
      }, 1000); // Close the tab after 1 seconds
    } catch (err) {
      setErrMsg("שגיאה בעת שינוי הסיסמה.");
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
                type="password"
                placeholder="סיסמה חדשה"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group input-group-outline mb-4 pt-4 ps-4">
              <input
                type="password"
                placeholder="אימות סיסמה חדשה"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errMsg && <div className="alert alert-danger">{errMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            <div className="row border-bottom">
              <div className="mb-4 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary d-block" disabled={loading}>
                  שנה סיסמה
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

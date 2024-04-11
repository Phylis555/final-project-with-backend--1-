
          
import axios from "../../api/axios";
import React, { useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./footer.css";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const LOGIN_URL = "/main/login";

export default function RequesterSignIn() {
  const setAuth = useAuth();
  const [cookies, setCookie] = useCookies(["access_token", "roles", "_id"]);
  const Navigate = useNavigate();
  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { accessToken, roles, _id } = response.data;

      let expires = new Date();
      expires.setTime(expires.getTime() + response.data.expires_in * 1000);
      setCookie("access_token", accessToken, { path: "/", expires });
      setCookie("roles", roles, { path: "/", expires });
      setCookie("uId", _id, { path: "/", expires });

      if (roles === "5150") {
        Navigate("/organization/dashboard");
      } else if (roles === "1984") {
        Navigate(`/`);
      } else if (roles === "2001") {
        Navigate(`/admin/dashboard`);
      }

      setAuth({ username, password, roles, accessToken });
      setUsername("");
      setPassword("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrMsg("שם המשתמש או הסיסמה שגויים");
      } else {
        setErrMsg("שגיאה בעת התחברות");
      }
    }
    console.log("FFFFFFFF");

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
            <p className="h3 fw-bold text-center mb-2 pb-4 border-bottom">התחבר</p>
            <div className="input-group input-group-outline mb-4 pt-4 ps-4">
              <input
                type="email"
                placeholder="מייל"
                className="form-control"
                ref={userRef}
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group input-group-outline mb-2 pt-2 ps-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="סיסמה"
                className="form-control rounded-end"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
               <span className="mt-1 me-2" onClick={togglePasswordVisibility}>
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
                </span>
            </div>

              <p className=" mt-1 mb-3 fs-7 ">
                * שכחת את הסיסמה? <Link to="">לחץ כאן</Link>
              </p>
            {errMsg && <div className="alert alert-danger">{errMsg}</div>}
            <div className="row border-bottom">
              <div className="mb-4 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary d-block" disabled={loading}>
                  התחבר
                </button>
              </div>
            </div>
            <p className="text-center mb-3 pt-2 fs-5 fw-normal">
              אין לך חשבון? <Link to="/user/signup">לחץ כאן</Link>
            </p>
          </form>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
 
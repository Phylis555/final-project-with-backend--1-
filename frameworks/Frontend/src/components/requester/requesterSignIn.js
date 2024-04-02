// import axios from "../../api/axios";
// import React from "react";
// import Footer from "../Footer";
// import NavBar from "../NavBar";
// import "./footer.css";
// import { Link } from "react-router-dom";
// import { useRef, useState, useEffect, useContext } from "react";
// import useAuth from "../../hooks/useAuth";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// // import { API_URL } from '../../api/config';
// const LOGIN_URL = "/main/login";

// export default function RequesterSignIn() {
//   const [cookies, setCookie] = useCookies(["access_token", "roles", "_id"]);
//   const Navigate = useNavigate();

//   const { setAuth } = useAuth();
//   const userRef = useRef();
//   const errRef = useRef();

//   const [username, setUser] = useState("");
//   const [password, setPwd] = useState("");
//   const [errMsg, setErrMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     // userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setErrMsg("");
//   }, [username, password]);

//   const handleSubmit = async (e) => {
    
//       e.preventDefault();
//       // console.log("AAAAAA");
//       // console.log(JSON.stringify({username,password}))

//       try {
//           console.log("HIIIII")
//           const response = await axios.post(LOGIN_URL,
//               JSON.stringify({ username, password }),
//               {
//                   headers: { 'Content-Type': 'application/json' },
//                   withCredentials: true
//               }
//           );
//           //console.log(JSON.stringify(response?.data));
//           //console.log(JSON.stringify(response));
//           const accessToken = response?.data?.accessToken;
//           const roles = response?.data?.roles;
//           const _id=response?.data?._id;

//           let expires = new Date()
//           expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
//           setCookie('access_token', accessToken, { path: '/',  expires});
//           console.log("QQQQQQQQQQQ")
//           setCookie('roles', roles ,{path: '/', expires});
//           setCookie('uId', _id ,{path: '/', expires});
//           console.log(_id)
          
//           if (roles===("5150")) {
//             Navigate('/organization/dashboard');
//           } else if (roles===("1984")){
//             Navigate(`/`);
//           }
          

//           setAuth({ username, password, roles, accessToken });
//           setUser('');
//           setPwd('');
//           setSuccess(true);

//           console.log(roles)

          
//           // response?.data.roles == 5150 ?
//           // // navigate('/staff/home')
//           // window.location.replace('/staff/home')
//           // : (response?.data.roles == 1984 ?
//           //   // navigate('/student/dashboard')
//           //   window.location.replace('/student/dashboard')
//           //   : response?.data.roles == 2001 ?
//           //     // navigate('/admins/home')
//           //     window.location.replace('/admins/home')
//           //     : navigate('/unauthorized'))




//       } catch (err) {
//           if (!err?.response) {
//               setErrMsg('No Server Response');
//           } else if (err.response?.status === 400) {
//               setErrMsg('Missing Username or Password');
//           } else if (err.response?.status === 401) {
//               setErrMsg('Unauthorized');
//           } else {
//               setErrMsg('Login Failed');
//           }
//           //  errRef.current.focus();
//           console.log(err)

//     e.preventDefault();
//     // console.log("AAAAAA");
//     // console.log(JSON.stringify({username,password}))

//     try {
//       console.log("HIIIII");
//       const response = await axios.post(
//         LOGIN_URL,
//         JSON.stringify({ username, password }),
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       //console.log(JSON.stringify(response?.data));
//       //console.log(JSON.stringify(response));
//       const accessToken = response?.data?.accessToken;
//       const roles = response?.data?.roles;
//       const _id = response?.data?._id;

//       let expires = new Date();
//       expires.setTime(expires.getTime() + response.data.expires_in * 1000);
//       setCookie("access_token", accessToken, { path: "/", expires });
//       console.log("QQQQQQQQQQQ");
//       setCookie("roles", roles, { path: "/", expires });
//       setCookie("uId", _id, { path: "/", expires });
//       console.log(_id);

//       if (roles === "5150") {
//         Navigate("/organization/dashboard");
//       } else if (roles === "1984") {
//         Navigate(`/`);
//       }else if (roles === "2001") {
//         Navigate(`/admin/dashboard`);
//       }

//       setAuth({ username, password, roles, accessToken });
//       setUser("");
//       setPwd("");
//       setSuccess(true);

//       console.log(roles);

//       // response?.data.roles == 5150 ?
//       // // navigate('/staff/home')
//       // window.location.replace('/staff/home')
//       // : (response?.data.roles == 1984 ?
//       //   // navigate('/student/dashboard')
//       //   window.location.replace('/student/dashboard')
//       //   : response?.data.roles == 2001 ?
//       //     // navigate('/admins/home')
//       //     window.location.replace('/admins/home')
//       //     : navigate('/unauthorized'))
//     } catch (err) {
//       if (!err?.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response?.status === 400) {
//         setErrMsg("Missing Username or Password");
//       } else if (err.response?.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg("Login Failed");

//       }
//       //  errRef.current.focus();
//       console.log("FFFFFFFF");
      


//     }
//   };

//   }

//   return (
//     <div>
//       <nav>
//         <NavBar />
//       </nav>
      
//       <div class="container d-flex justify-content-center pt-5 pb-5" dir="rtl">
//         <div className="card card-signin z-index-0 fadeIn3 fadeInBottom ">
//           <form class="form-control p-5" onSubmit={handleSubmit}>
//             <p class="h3 fw-bold text-center mb-2 pb-4 border-bottom">
//               התחבר{" "}
//             </p>

//             <div class="input-group input-group-outline mb-4 pt-4" >
//               <input
//                 type="email"
//                 placeholder="מייל"
//                 class="form-control"
//                 ref={userRef}
//                 autoComplete="off"
//                 onChange={(e) => {
//                   setUser(e.target.value);
//                 }}
//                 value={username}
//                 required
//               />
//             </div>
//             <div class="input-group input-group-outline mb-4 pt-2">
//               <input
//                 type="password"
//                 placeholder="סיסמה"
//                 class="form-control"
//                 id="password"
//                 onChange={(e) => setPwd(e.target.value)}
//                 value={password}
//                 required
//               />
//             </div>

//             <div class="row border-bottom">
//               <div class="mb-4 d-flex justify-content-center">
//                 <input
//                   type="submit"
//                   class="btn btn-primary d-block "
//                   value="התחבר"
//                 />
//               </div>
//             </div>
//             <p class="text-center mb-3 pt-2"> אין לך חשבון? <Link to="/user/signup"> לחץ כאן</Link></p>
//           </form>
//         </div>
//       </div>

//       <footer>
//         <Footer />
//       </footer>
//     </div>

//   );

// }
          
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

const LOGIN_URL = "/main/login";

export default function RequesterSignIn() {
  const [cookies, setCookie] = useCookies(["access_token", "roles", "_id"]);
  const Navigate = useNavigate();
  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

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
            <div className="input-group input-group-outline mb-4 pt-4">
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
            <div className="input-group input-group-outline mb-2 pt-2">
              <input
                type="password"
                placeholder="סיסמה"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
 
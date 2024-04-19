import React, { useState, useEffect } from "react";
import classes from "./DashCard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

// // Function to retrieve the token from the cookie
// const getTokenFromCookie = () => {
//   return getCookie('access_token'); // Assuming 'header' is the name of your cookie
// };

// // Function to create a base request configuration with authorization header
// const getRequestConfig = () => {
//   const token = getTokenFromCookie();
//   const headers = {
//     'Authorization': `Bearer ${token}` // Assuming the token is prefixed with 'Bearer'
//   };
//   return { headers };
// };

const DashCard = () => {
  const [length, setLength] = useState(0);
  const [length2, setLength2] = useState(0);
  const [datatable, setDatatable] = useState([]);
  const [datatable2, setDatatable2] = useState([]);

  useEffect(() => {
    getReqOrgList();
    getDonList();
  }, []);

  const getDonList = async () => {
    try {
      const data = await axios.get(`http://localhost:8070/admin//getpdon/`);
      setDatatable(data.data);
      setLength(countPendingDonations(data.data));
    } catch (e) {
      console.log(e);
    }
  };

  const getReqOrgList=async()=>{
    try{
        const data=await axios.get(`http://localhost:8070/admin/reqfunds`);
        setDatatable2(data.data)
        setLength2(countPendingDonations(data.data));

    }catch(e){
        console.log(e)
    }
}

  const countPendingDonations = (data) => {
    // ספירת מספר התרומות הממתינות לאישור
    return data.filter((org) => org.status === "pending").length;
  };

  return (
    <div className={classes.DashCard0}>
      <div className={classes.DashCard}>
        <div className={classes.Card2}>
          <div className={classes.CardHeading2}>
            <Link to={"/admin/reqorglist"}> בקשות ארגונים לרישום</Link>
          </div>
          <div className={classes.CardData}></div>
        </div>
        <div className={classes.Card2}>
          <div className={classes.CardHeading2}>
            <Link to={"/admin/reqfund"}>בקשות ליצירת גיוס כספים</Link>
          </div>
          <div className={classes.CardData}></div>
        </div>
        <div className={classes.Card2}>
          <div className={classes.CardHeading2}>
            <Link to={"/admin/reqdon"}> בקשות לתרומת ציוד</Link>
          </div>
          <div className={classes.CardData}></div>
        </div>

        <div className={classes.Card2}>
          <div className={classes.CardHeading}>
            מספר בקשות הממתינות לאישור <br/> (לתרומות ציוד וכסף)
          </div>
          <div className={classes.CardData}>
            <div className={classes.Count}>{length+length2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCard;

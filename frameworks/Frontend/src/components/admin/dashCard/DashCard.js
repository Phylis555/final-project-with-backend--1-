import React, { useState, useEffect } from "react";
import classes from "./DashCard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthHeader } from "../../common/authHeader";

const DashCard = () => {
  // State variables to store data
  const [length, setLength] = useState(0);
  const [length2, setLength2] = useState(0);
  const [datatable, setDatatable] = useState([]);
  const [datatable2, setDatatable2] = useState([]);

    // Fetching data on component mount
    useEffect(() => {
    getReqOrgList();
    getDonList();
  }, []);

    // Function to fetch donation list
  const getDonList = async () => {
    try {
      const data = await axios.get(`http://localhost:8070/admin//getpdon/`, getAuthHeader());
      setDatatable(data.data);
      setLength(countPendingDonations(data.data));
    } catch (e) {
      console.log(e);
    }
  };

  // Function to fetch organization request list
  const getReqOrgList=async()=>{
    try{
        const data=await axios.get(`http://localhost:8070/admin/reqfunds`, getAuthHeader());
        setDatatable2(data.data)
        setLength2(countPendingDonations(data.data));

    }catch(e){
        console.log(e)
    }
}

  // Function to count pending donations
  const countPendingDonations = (data) => {
    return data.filter((org) => org.status === "pending").length;
  };

  return (
    <div className={classes.DashCard0}>
      <div className={classes.DashCard}>
        <div className={classes.Card2}>
          <div className={classes.CardHeading2}>
            <Link to={"/admin/reqorglist"}> בקשות ארגונים לרישום</Link>
          </div>
        </div>
        <div className={classes.Card2}>
          <div className={classes.CardHeading2}>
            <Link to={"/admin/reqfund"}>בקשות ליצירת גיוס כספים</Link>
          </div>
        </div>
        <div className={classes.Card2}>
          <div className={classes.CardHeading2}>
            <Link to={"/admin/reqdon"}> בקשות לתרומת ציוד</Link>
          </div>
        </div>

        {/* Card for displaying number of pending requests */}
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

import React from "react";
import Dashboard from "../components/admin/dashboard";
import SideNav from "../components/admin/sideNav";
import DashCard from "../components/admin/dashCard/DashCard";
import Unauthorized from "../components/common/unauthorized";
import { getCookie } from "../components/common/getCookie";

export default function AdminDashboard() {
    return (
        <>
          {
            getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
            <>
                <SideNav dashboard="true"/>
                <Dashboard />
                <DashCard/>  
             </>
            ) : <Unauthorized />
        }
        
        </>
    );
}


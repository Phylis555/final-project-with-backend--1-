import React from "react";
import SideNav from "../../components/admin/sideNav";
import ReqFund from "../../components/admin/fundraiserRequestList";
import Unauthorized from "../../components/common/unauthorized";
import { getCookie } from "../../components/common/getCookie";

export default function RequestedOrganizations (){

    return(
        <>
         {  getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
                <>
                    <SideNav reqfund="true"/>
                    <ReqFund/>
                </>
            ) : <Unauthorized />
        }
            
        </>
    )
}
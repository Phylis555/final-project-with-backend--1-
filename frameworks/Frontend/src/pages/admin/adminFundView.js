import React from "react";
import ViewSelectedFund from "../../components/admin/Fund/fundview";
import SideNav from "../../components/admin/sideNav";
import Unauthorized from "../../components/common/unauthorized";
import { getCookie } from "../../components/common/getCookie";

export default function RequestedOrganizations (){

    return(
        <>
        {  getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
                <>
                   <SideNav regfund="true"/>
                    <ViewSelectedFund/>
                </>
            ) : <Unauthorized />
        }    
            
        </>
    )
}
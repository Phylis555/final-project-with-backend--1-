import React from "react";
import SideNav from "../../components/admin/sideNav";
import OrgView from "../../components/admin/orgView/orgView"
import Unauthorized from "../../components/common/unauthorized";
import { getCookie } from "../../components/common/getCookie";

export default function RequestedOrganizations (){

    return(
        <>
        {  getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
                <>
                   <SideNav regorglist="true"/>
                    <OrgView/>
                </>
            ) : <Unauthorized />
        }    
            
        </>
    )
}
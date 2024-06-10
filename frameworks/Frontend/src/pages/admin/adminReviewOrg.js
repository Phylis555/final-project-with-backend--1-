import React from "react";
import SideNav from "../../components/admin/sideNav";
import AdminReviewOrg from "../../components/admin/orgView/orgReview";
import Unauthorized from "../../components/common/unauthorized";
import { getCookie } from "../../components/common/getCookie";

export default function ReviewOrganization (){

    return(
        <>
         {  getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
                <>
                     <SideNav/>
                    <AdminReviewOrg regorglist="true"/>
                </>
            ) : <Unauthorized />
           }
           
        </>
    )
}
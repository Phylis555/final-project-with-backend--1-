import React from "react";
import SideNav from "../../components/admin/sideNav";
import GetRequestedDonations from "../../components/admin/donation/reqDonationList";
import Unauthorized from "../../components/common/unauthorized";
import { getCookie } from "../../components/common/getCookie";

export default function RequestedDonation (){

    return(
        <>
        {  getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
                <>
                    <SideNav reqdon="true"/>
                    <GetRequestedDonations/>
                </>
            ) : <Unauthorized />
        }
           
        </>
    )
}
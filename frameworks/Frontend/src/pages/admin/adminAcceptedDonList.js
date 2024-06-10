import React from "react";
import SideNav from "../../components/admin/sideNav";
import GetRequestedDonations from "../../components/admin/donation/reqDonationList";
import GetAcceptedDonations from "../../components/admin/donation/acceptedDonationList";
import Unauthorized from "../../components/common/unauthorized";
import { getCookie } from "../../components/common/getCookie";

export default function AcceptedDonation (){

    return(
        <>
        {  getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
                <>
                   <SideNav accepteddon="true"/>
                    <GetAcceptedDonations/>
                </>
            ) : <Unauthorized />
        }    
            
        </>
    )
}
import React from "react";
import SideNav from "../../components/admin/sideNav";
import NavButton from "../../components/admin/donation/NavButton";
import GetRequestedDonations from "../../components/admin/donation/reqDonationList";

export default function RequestedDonation (){

    return(
        <>
            <NavButton/>
            <SideNav reqdon="true"/>
            <GetRequestedDonations/>
        </>
    )
}
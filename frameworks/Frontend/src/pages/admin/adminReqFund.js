import React from "react";
import SideNav from "../../components/admin/sideNav";
import ReqFund from "../../components/admin/fundraiserRequestList";
import NavButton from "../../components/admin/Fund/NavButton";

export default function RequestedOrganizations (){

    return(
        <>
            <NavButton/>
            <SideNav reqfund="true"/>
            <ReqFund/>
        </>
    )
}
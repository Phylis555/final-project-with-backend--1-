import React from "react";
import ViewSelectedFund from "../../components/admin/Fund/fundview";
import SideNav from "../../components/admin/sideNav";
import NavButton from "../../components/admin/orgrequestlist/NavButton";

export default function RequestedOrganizations (){

    return(
        <>
            <NavButton/>
            <SideNav regfund="true"/>
            <ViewSelectedFund/>
        </>
    )
}
import React from "react";
import SideNav from "../../components/admin/sideNav";
import GetUserList from "../../components/admin/user/userlist";
import Unauthorized from "../../components/common/unauthorized";
import { getCookie } from "../../components/common/getCookie";

export default function GetAllUserList (){

    return(
        <>
           {  getCookie("uId") && getCookie("access_token") && getCookie("roles") && getCookie("roles") === "2001" ? (
                <>
                <SideNav getusers="true"/>
                <GetUserList/>
                </>
            ) : <Unauthorized />
           }
        </>
    )
}
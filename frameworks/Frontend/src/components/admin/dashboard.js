import React from "react";

export default function Dashboard() {
    const toggleSidenav = (e) => {
        e.preventDefault();
        document.body.classList.remove("g-sidenav-pinned");
    };
    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
            <div className="container-fluid py-4 " onClick={toggleSidenav}>
                <div className="row">
                    <h1>מנהל מערכת</h1>
                </div>
            </div>
        </main>
    )
}
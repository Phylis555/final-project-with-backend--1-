import React, { useState } from "react";
import "../css/dashboardCard.css";

export default function DashboardCard(props) {
  let Background = "https://i.postimg.cc/523fVDtk/ds.png";
  return (
    <>
      <div className="cardScall "
        style={{
          backgroundImage: `url(${props.image})`,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
        }}
      >
        <h3  dir="rtl"
          className="cardH3"
        >
          {props.title}
        </h3>
        <div  
          style={{
            
            marginLeft: 150,
            marginTop: 20,
          }}
        >
          <h3>{props.count}</h3>
        </div>
      </div>
      {/* <div class="container" style={{ width: 400, height: 200 }}>
        <div class="card img-fluid">
          <img
            class="card-img-top"
            src={props.image}
            alt="Card image"
            style={{ width: "100%" }}
          />
          <div class="card-img-overlay">
            <h4 class="card-title" style={{ paddingTop: 20 }}>
              {props.title}
            </h4>
            <p class="card-text">{props.count}</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

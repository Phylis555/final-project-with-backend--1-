import React from "react";
import "../css/dashboardCard.css";

export default function DashboardCard(props) {
  return (
    <>
      <div className="cardScall "
        style={{
          backgroundImage: `url(${props.image})`,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
          backgroundSize:"122%",
          backgroundRepeat:"no-repeat" ,
          backgroundPosition: "right",
          
        }}
      >
        <h3  dir="rtl" className="cardH3">
          {props.title} {/* Displaying title from props */}
        </h3>
        <div  
          style={{
            
            marginLeft: 150,
            marginTop: 20,
          }}
        >
          <h3>{props.count}</h3> {/* Displaying count from props */}
        </div>
      </div>
    </>
  );
}

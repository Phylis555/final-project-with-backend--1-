// import React from "react";
// import Logo2 from "../assets/images/logo-2-white.png";
// import "./requester/footer.css";

// function Footer() {
//   return (
//     <div
//       style={{
//         marginTop: 20,
//       }}
//     >
//       <footer className="text-center text-lg-start text-dark bg-gradient-light">
//         <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
//           <div className="me-5 d-none d-lg-block ">
//             <span>שתף אותנו</span>
//           </div>

//           <div>
//             <a href="" className="me-4 text-reset">
//               <i className="bi bi-facebook"></i>
//             </a>
//             <a href="" className="me-4 text-reset">
//               <i className="bi bi-twitter"></i>
//             </a>
//             <a href="" className="me-4 text-reset">
//               <i className="bi bi-google"></i>
//             </a>
//             <a href="" className="me-4 text-reset">
//               <i className="bi bi-instagram"></i>
//             </a>
//             {/* <a href="" className="me-4 text-reset">
//               <i className="bi bi-linkedin"></i>
//             </a>
//             <a href="" className="me-4 text-reset">
//               <i className="bi bi-github"></i>
//             </a> */}
//           </div>
//         </section>

//         <section className="" dir="rtl">
//           <div className="container text-center text-md-start mt-3">
//             <div className="row mt-1">
             
//               <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-3">
//                 <h6 className="text-reset text-uppercase fw-bold mb-3">
//                   מידע נוסף
//                 </h6>
//                 <p>
//                   <a href="#!" className="text-reset">
//                     איך זה עובד?
//                   </a>
//                 </p>
//                 <p>
//                   <a href="#!" className="text-reset">
//                     שאלות / תשובות
//                   </a>
//                 </p>
//               </div>

//               <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-3">
//                 <h6 className="text-reset text-uppercase fw-bold mb-3">
//                   שימושי
//                 </h6>
//                 <p>
//                   <a href="#!" className="text-reset">
//                     צור קשר
//                   </a>
//                 </p>
//                 <p>
//                   <a href="#!" className="text-reset">
//                     תנאי שימוש
//                   </a>
//                 </p>
//               </div>
//               <div className="col-md-2  col-lg-3 col-xl-2 mx-auto mb-3">
//                 <div className="">
//                   <img className="img-footer" src={Logo2} />
//                 </div>
//               </div>
// {/* 
//               <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
//                 <h6 className="text-reset text-uppercase fw-bold mb-4">
//                   Contact
//                 </h6>
//                 <p>
//                   <i className="bi bi-geo-alt-fill pe-3"></i> מכללת אפקה, תל אביב
//                 </p>
//                 <p>
//                   <i className="bi bi-envelope-fill pe-3"></i> info@example.com
//                 </p>
//                 <p>
//                   <i className="bi bi-phone-fill pe-3"></i> + 01 234 567 88
//                 </p>
//                 <p>
//                   <i className="bi bi-telephone-fill pe-3"></i> + 01 234 567 89
//                 </p>
//               </div> */}
//             </div>
//           </div>
//         </section>

//       </footer>
//     </div>
//   );
// }

// export default Footer;

import React, { useState } from "react";
import Logo2 from "../assets/images/logo-2-white.png";
import "./requester/footer.css";

function Footer() {
  const [isAccordionOpen, setIsAccordionOpen] = useState("");

  const toggleAccordion = (section) => {
    setIsAccordionOpen(section === isAccordionOpen ? "" : section);
  };

  return (
    <div style={{ marginTop: 20 }} dir="rtl">
      <footer className="text-center text-lg-start text-dark bg-gradient-light">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block ">
            <span>שתף אותנו</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="bi bi-google"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </section>

        <section className="" dir="rtl">
          <div className="container text-center text-md-start mt-3" >
            <div className="row mt-1" >
             
              <div className="col-md-2 col-lg-2 col-xl-3 mx-auto mb-3" dir="rtl">
                <h6 className="text-reset text-uppercase fw-bold mb-3">
                  מידע נוסף
                </h6>
                <p  dir="rtl">
                  <a
                    href="#!"
                    className={`text-reset ${isAccordionOpen === "info" ? "active" : ""}`}
                    onClick={() => toggleAccordion("info")}
                  >
                    איך זה עובד?
                  </a>
                  {isAccordionOpen === "info" && (
                    <div className="accordion-content">
                      <p className="smallP">באתר Instant Giving תוכלו לקבל ולתרום ציוד בצורה פשוטה ונוחה.
                       כדי לבצע פעולות אלו, יש להתחבר לחשבון האישי שלכם. לאחר התחברות, תוכלו לקשת תרומות של ציוד,
                        ולעקוב אחרי בקשות תרומות שלכם באיזור האישי שנקרא 'הבקשות ציוד שלי'.</p>
                      <p className="smallP">בנוסף עמותות יכולות להתחבר כארגון ולבקש תרומות כספיות.
                       שלהם כל אחד יכול לתרום באמצעות כרטיס אשראי, מה שמאפשר תרומה מהירה ונוחה.
                       נשמח לעזור ולתת שירות מיטבי לכל משתמש באתר!</p>

                    </div>
                  )}
                </p>
                <p>
                  <a href="#!" className="text-reset">
                  שאלות / תשובות                 
                  </a>
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-3 mx-auto mb-3">
                <h6 className="text-reset text-uppercase fw-bold mb-3">
                  שימושי
                </h6>
                <p dir="rtl">
                  <a
                    href="#!"
                    className={`text-reset ${isAccordionOpen === "faq" ? "active" : ""}`}
                    onClick={() => toggleAccordion("cont")}
                  >
                    צור קשר
                  </a>
                  {isAccordionOpen === "cont" && (
                    <div className="accordion-content">
                      <p className="smallP">אנו זמינים לכל שאלה, הערה או בקשה נוספת שיש לך. אל תהסס ליצור קשר עמנו בכל נושא הקשור לשירותינו או לאתר. תוכל ליצור איתנו דרך מספר הטלפון הבא: 050-5050505 או ברשתות החברתיות</p>
                    </div>
                  )}
                </p>
                <p>
                  <a
                    href="#!"
                    className={`text-reset ${isAccordionOpen === "faq" ? "active" : ""}`}
                    onClick={() => toggleAccordion("con")}
                  >
                    תנאי שימוש
                  </a>
                  {isAccordionOpen === "con" && (
                    <div className="accordion-content smallP">
                      <p className="smallP">תנאי השימוש הבאים מגדירים את התנאים וההגבלות שבהם משתמש יכול להשתמש באתר שלנו ובשירותים שאנו מציעים.</p>
                    <p className="smallP">אנו לא נהיה אחראים לכל נזק או להפסד שנגרם משימוש לא נכון באתר או מהסתמכות על מידע שנמצא בו. </p>
                    <p className="smallP">נשמח לקבל ממך תיקונים או הערות על תכני האתר. אין לשלוח תכנים לאתר שיש בהם תוכן שהוא לא חוקי, מגונה או מפר זכויות יוצרים . </p>
                    <p className="smallP">אנו שומרים לעצמנו את הזכות לשנות את תנאי השימוש בכל עת. יש לבדוק מדי פעם את תנאי השימוש כדי להיות מודעים לשינויים שנעשו </p>
                    </div>
                  )}
                </p>
              </div>
              <div className="col-md-2  col-lg-3 col-xl-2 mx-auto mb-3">
                <div className="">
                  <img className="img-footer" src={Logo2} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default Footer;




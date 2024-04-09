import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { newDonation } from "../../api/donator.api";
import NavBar from "../NavBar";
import DonatorDashboard from "./donatorDashboard";

import LoadingSpinner from "../common/LoadingSpinner";
import { getCookie } from "../common/getCookie";
import Footer from "../Footer";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function CreateDonation() {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate() + 1;
  var year = dtToday.getFullYear();
  var Nextyear = dtToday.getFullYear()+1;

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  var minDate = year + "-" + month + "-" + day;
  var maxDate = Nextyear + "-" + month + "-" + day;

  console.log(minDate);
  const categories = ["כלי עבודה","ציוד רפואי","אלקטרוניקה","ציוד ספורט", "בגדים", "ציוד משרדי", "אחר"]; 

  const navigate = useNavigate();
  const [donationTitle, setDonationTitle] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [donationDescription, setDonationDescription] = useState("");
  const [donationEndDate, setDonationEndDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  // const [category, setCategory] = useState(""); 

  const [wantedItems, setWantedItems] = useState([]); 
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [wantedQuantity, setWantedQuantity] = useState('');

  // const handleCategoryChange = (e) => {
  //   setCategory(e.target.value); 
  // };
  
  useEffect(() => {
    setUserId(getCookie("uId"));
  }, []);

  let filesarr = [];
  const fileUpload = (files) => {
    filesarr = files;
    // console.log(filesarr.base64);
  };

  const handleAddItem = () => {
    // Validate input fields
    if (!itemName || !selectedCategory || !wantedQuantity) {
      alert('Please fill all fields');
      return;
    }
  
    // Create a new item object
    const newItem = {
      itemName: itemName,
      category: selectedCategory,
      quantity: wantedQuantity
    };

    // Add the new item to the array of wanted items
    setWantedItems(prevItems => [...prevItems, newItem]);

    // Clear input fields
    setItemName('');
    setSelectedCategory('');
    setWantedQuantity('');
  };

  const createDonation = async (e) => {
    if (wantedItems.length === 0) {
      alert('אנא הוסף פריט לפני הגשת הבקשה');
      return;
    }

    setLoading(true);
    e.preventDefault();
    const donationImage = filesarr.base64;
    console.log(donationImage);
    const userID = userId;


    const donation = {
      userID,
      donationTitle,
      email,
      location,
      donationEndDate,
      contactNumber,
      donationImage,
      donationDescription,
      wantedItems
    };
    console.log(donation);
    await newDonation(donation)
      .then((res) => {
        setLoading(false);
        swal("תרומה נוצרה בהצלחה", "", "success").then((value) => {
          if (value) {
            navigate("../dashboard");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        swal("יצירת התרומה נכשלה", "בבקשה נסה שוב", "error").then(
          (value) => {
            if (value) {
              navigate("../dashboard");
            }
          }
        );
      });
  };

  return (
    <>
      {/* <span class="mask bg-gradient-dark opacity-6"></span> */}
      <NavBar />
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            bottom: 0,
            left: 0,
            right: 0,

            margin: "auto",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <div
          class="container my-auto"
          style={{ paddingTop: 30, marginBottom: 100 }}
        >
          <div class="row" dir="rtl">
            <div class="mx-auto">
              <div class="card z-index-0 fadeIn3 fadeInBottom">
                <div class="card-body">
                  <form
                    role="form"
                    class="text-start"
                    onSubmit={createDonation}
                  >
                    <div class="d-flex justify-content-center">
                      <h4>צור את הבקשה לתרומה שלך</h4>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div></div>
                      <div></div>
                      <h6>*שדות חובה</h6>
                    </div>

                    <div class="input-group mb-3 input-group input-group-outline mb-3">
                      <input
                        type="text"
                        maxLength={35}
                        class="form-control"
                        placeholder="כותרת*"
                        aria-label="Donation Title"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setDonationTitle(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="input-group input-group input-group-outline ">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="מיקום*"
                        aria-label="Location"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <label className= "my-3">פרטי איש קשר:</label>

                    <div class="input-group  input-group input-group-outline mb-3">
                      
                      <input
                        type="text"
                        placeholder="מספר טלפון של איש קשר*"
                        aria-label="Contact Number"
                        aria-describedby="basic-addon1"
                        title="מספר טלפון בעל 10 ספרות"
                        pattern="[0]{1}[0-9]{9}"
                        class="form-control"
                        onChange={(e) => {
                          setContactNumber(e.target.value);
                        }}
                      />
                    </div>
                    <div class="input-group input-group input-group-outline ">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email*"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <label className= "my-3">תאריך סיום התרומה:</label>
                    <div class="input-group input-group input-group-outline mb-3">
                      <input
                        placeholder="תאריך סיום התרומה"
                        class="form-control"
                        type="date"
                        min={minDate}
                        max={maxDate}
                        id="datefield"
                        onFocus={(e) => (e.target.type = "date")}
                        onChange={(e) => {
                          setDonationEndDate(e.target.value);
                        }}
                      />
                    </div>
                    
                  <label className= "">הוספת פריטים:</label>
                   <div className="input-group input-group-outline align-items-center"> 
                    <select
                      className="form-select ms-2 rounded-2"
                      aria-label="Select Category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">בחר קטגוריה</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className="form-control ms-2 rounded-2"
                      placeholder="שם הפריט"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  
                    <input
                      type="number"
                      className="form-control ms-2 rounded-2"
                      placeholder="כמות מבוקשת"
                      value={wantedQuantity}
                      onChange={(e) => setWantedQuantity(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-start me-2 mt-2" onClick={handleAddItem}>                        
                      <i className="fas fa-plus" style={{ marginLeft: '5px' }}></i>
                        הוסף
                    </button>
                    </div>
                  <div>
                    {wantedItems.length > 0 && (
                      <div>
                        <h2>הפריטים המבוקשים:</h2>
                        <ul>
                          {wantedItems.map((item, index) => (
                            <li key={index}>
                              {item.itemName} - {item.category} - {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div class="input-group mb-3 input-group input-group-outline mb-3">
                    <textarea
                      class="form-control"
                      placeholder="תיאור אודות התרומה*"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => {
                        setDonationDescription(e.target.value);
                      }}
                      required
                    ></textarea>
                  </div>
                  <div>הוספת תמונה</div>
                  <FileBase64 onDone={(files) => fileUpload(files)} />
                  <div class="text-center">
                    <button type="submit" class="btn btn-secondary">
                      יצירת בקשה לתרומה
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          marginTop: 100,
        }}
      >
        <Footer />
      </div>
    </>
  );
}


              
                 
                  
                  
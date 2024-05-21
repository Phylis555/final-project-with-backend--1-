import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneDonation } from "../../../api/donator.api";
import { newRequest } from "../../../api/donator.api";
import NavBar from "../../NavBar";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { requesterProfile } from '../../../api/requester.api';
import { getCookie } from "../../common/getCookie";


export default function SendRequest() {
  const navigate = useNavigate();

  const { id } = useParams(); 
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesterName, setRequesterName] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [requesterContact, setRequesterContact] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [donationItems, setDonationItems] = useState([]);
  const [donationItemsForItenAmount, setDonationItemsForItenAmount] = useState([]);

  const [hasSelectedItem,seyHasSelectedItem]=useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(getCookie("uId"));// Fetch the user ID from cookies
  }, []);

  // useEffect(() => {
  //   // Fetch the requester profile when the user ID changes
  //   requesterProfile(userId)
  //     .then((res) => {
  //       // Update the requester details
  //        console.log(res.data);
  //       setRequesterEmail(res.data.requester.email);
  //       setRequesterContact("0" + res.data.requester.contactNumber);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [userId]);

  useEffect(() => {
    if (userId) {
      // Fetch the requester profile when the user ID changes
      requesterProfile(userId)
        .then((res) => 
          {
            // Update the requester details
          setRequesterEmail(res.data.requester.email);
          setRequesterContact("0" + res.data.requester.contactNumber);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [userId]);
  

  useEffect(() => {
    // Fetch donation details when the donation ID changes
    getOneDonation(id)
      .then((res) => {
        setDonation(res.data.donation);
        setDonationItems(res.data.donation.wantedItems);
        setDonationItemsForItenAmount(res.data.donation.wantedItems);
        setLoading(false);
        whenStartItemQuantityChange();
          
      }).catch((error) => {
        console.error("Error fetching donation:", error);
        setLoading(false);
      });
  }, [id]);

  const whenStartItemQuantityChange = () => {
     // Initialize the received amount of each item to 0
    setDonationItems((prevItems) =>
      prevItems.map((item) => ({ ...item, receivedAmount: 0 }))
    );
  };


  const handleItemQuantityChange = (itemId, quantity) => {
    // Update the received amount of the selected item
    setDonationItems((prevItems) =>
      prevItems.map((item) =>
        item.item._id === itemId ? { ...item, receivedAmount: quantity } : item
      )
    );
    seyHasSelectedItem(true);// Indicate that at least one item is selected

  };

  // Handle form submission to create a new request
  const createRequest = async (e) => {
    e.preventDefault();
    // Alert the user if no item is selected
    if (!hasSelectedItem) {
      alert('אנא הוסף פריט לפני הגשת הבקשה');        
      return;
      
    }
    const request = {
      donationID: id,
      requesterName,
      requesterEmail,
      requesterContact,
      requestDescription,
      donatedItems: donationItems
      .filter((item) => item.receivedAmount > 0)
      .map(({ wantedQuantity, ...rest }) => rest),
    };
    await newRequest(request)
      .then((res) => {
        setLoading(false);
        // Show success message and navigate to the home page
        swal("הבקשה נשלחה בהצלחה", "", "success").then((value) => {
          if (value) {
            navigate("/");
          }
        });     
      })
      .catch((error) => {
        console.log(error)
        //show error message;
        swal("שליחת הבקשה נכשלה", "בבקשה נסה שוב", "error").then(
          (value) => {
            if (value) {
              navigate("/");
            }
          }
        );
      });
      
  };

  if (loading) {
    // Show a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container my-auto" style={{ paddingTop: 30 }} dir="rtl">
        <div className="row">
          <div className="mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-body">
                <form role="form" className="text-start" onSubmit={createRequest}>
                  <div className="d-flex justify-content-center">
                    <h4>שלח בקשה</h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div></div>
                    <div></div>
                    <h6>*שדות חובה</h6>
                  </div>

                  {/* Input fields for requester details */}
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="שם מלא*"
                      onChange={(e) => setRequesterName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="text"
                      placeholder="מספר ליצירת קשר*"
                      className="form-control"
                      value= {requesterContact}
                      onChange={(e) => setRequesterContact(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                      value={requesterEmail}
                      onChange={(e) => setRequesterEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group mb-3 input-group input-group-outline mb-3">
                    <textarea
                      className="form-control"
                      placeholder="תיאור*"
                      rows="3"
                      onChange={(e) => setRequestDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-3">בחר פריטים לתרומה:</h4>
                    <div className="table-responsive ">
                      <table className="table table-bordered table-hover text-center ">
                        <thead className="table-primary ">
                          <tr>
                            <th scope="col">שם הפריט</th>
                            <th scope="col">כמות מבוקשת</th>
                            <th scope="col">כמות שנותרה להשלמת התרומה</th>
                            <th scope="col">בחירת כמות לתרומה</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donationItems.map((item) => (
                            <tr className=""  key={item.item._id}>
                              <td>{item.item.itemName}</td>
                              <td>{item.wantedQuantity}</td>
                              <td>{donationItemsForItenAmount.find((donationItem) => donationItem.item._id === item.item._id).wantedQuantity - 
                              donationItemsForItenAmount.find((donationItem) => donationItem.item._id === item.item._id).receivedAmount}</td>
                                  
                              <td>
                                <div className="input-group ">
                                  <input
                                    type="number"
                                    min="0"
                                    max={donationItemsForItenAmount.find((donationItem) => donationItem.item._id === item.item._id).wantedQuantity - 
                                      donationItemsForItenAmount.find((donationItem) => donationItem.item._id === item.item._id).receivedAmount}
                                    placeholder="הכנס כמות"
                                    onChange={(e) => handleItemQuantityChange(item.item._id, parseInt(e.target.value))}
                                    className="form-control fw-bold fs-6 text-center"
                                  />
                                </div>
                                
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      שלח
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
